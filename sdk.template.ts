import crypto from 'crypto'
import fetch from 'cross-fetch'

type GraphQLError = { message: string, path: string[], extensions?: { code?: string }}

type Request<key extends string | number | symbol> = { query: string; operationName: key, variables: Record<string, unknown> }

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

class UnexpectedError extends Error {
  data: unknown
  constructor(message: string, data: unknown) {
    super(message)
    this.name = 'AuthenticationError'
    this.data = data
  }
}

class OperationError extends Error {
  errors: GraphQLError[]
  constructor(errors: GraphQLError[]) {
    super(errors[0].message)
    this.name = 'OperationError'
    this.errors = errors
  }
}

export class Firesquad {
  private apiUrl: string
  private apiId: string
  private apiKey: string

  private token: string

  /**
   * Creates a Firesquad SDK Instance.
   * @param apiUrl Root URL assigned to your account.
   * @param apiId ID of the integration.
   * @param apiKey API Secret to authenticate.
   */
  constructor(apiUrl: string, apiId: string, apiKey: string) {
    if (!apiUrl.startsWith('https://'))
      throw new Error('Incorrect protocol, API URL should start with https://')

    this.apiUrl = apiUrl
    this.apiId = apiId
    this.apiKey = apiKey
  }

  /**
   * This signs an authentication payload, used to validate your authentication
   * with our API without transmitting your token, exchanging it to a short-timed JWT.
   * @param payload - payload to sign.
   * @returns SHA-256 signature of the payload.
   */
  private signPayload(payload: string) {
    return crypto.createHmac('sha256', this.apiKey).update(payload).digest('hex')
  }

  /**
   * Retrieves a fresh token from the API.
   * @returns - A new token
   */
  private async refreshToken() {
    const body = JSON.stringify({
      api_id: this.apiId,
      timestamp: new Date().toISOString(),
    })

    try {
      const res = await fetch(`${this.apiUrl}/auth`, {
        method: 'POST',
        body,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-signature-sha-256': this.signPayload(body)
        }
      })

      if (res.ok) {
        const data = await res.json()
        this.token = data.token
        return this.token
      }
  
      if (res.status === 400)
        throw new AuthenticationError(`Incorrect credentials.`)
      
      throw new UnexpectedError(`Failed to exchange token`, { res, json: await res.json() })
    } catch (e) {
      if (e.data) throw e
      throw new UnexpectedError(`Failed to exchange token`, { error: e })
    }
  }

  /**
   * Returns a local token if not expired.
   * @returns - String token
   */
  private async getToken() {
    try {
      if (this.token) {
        const date = Date.now() - 500
        const token = JSON.parse(Buffer.from(this.token.split('.')[1], 'base64').toString('utf-8'))
        return !token || date >= token.exp * 1000 ? await this.refreshToken() : this.token
      }

      return await this.refreshToken()
    } catch(e) {
      return await this.refreshToken()
    }
  }



  private async doRequest<key extends keyof res, res = Record<key, unknown>>(request: Request<key>): Promise<res[key]> {
    const req = await fetch(`${this.apiUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await this.getToken()}`
      },
      body: JSON.stringify({
        query: request.query,
        variables: request.variables,
        operationName: request.operationName
      })
    })

    const { data, errors } = await req.json()
    if (errors)
      throw new OperationError(errors)

    return data?.[request.operationName]
  }

  /* $REPLACE$ */
}