import type * as ClientAPI from './types'

export type Events = {
  /**
   * @protected - Only used internally.
   * Used when triggering a unfurl completion
   */
  'unfurl:resolve': {
    name: 'unfurl:resolve'
    messageId: string
  }
  /**
   * Event received when a user is trying to
   * authenticate and webhook authentication is set.
   */
  'user:authenticate': {
    token: string
    visitorId: string
    name: 'user:authenticate'
    attributes?: Array<ClientAPI.VisitorAttributeCategoryInput>
  }
  /**
   * Triggered when a visitor starts a new conversation.
   */
  'visitor:new-conversation': {
    name: 'visitor:new-conversation'
    conversation: ClientAPI.Conversation
  }
  /**
   * Triggered when a visitor posts a new message.
   */
  'visitor:message': {
    name: 'visitor:message'
    message: ClientAPI.ConversationItem
  }
  /**
   * Triggered when a operator answers a visitor message.
   */
  'operator:message': {
    name: 'operator:message'
    message: ClientAPI.ConversationItem
  }
  /**
   * Triggered when an operator closes a conversation.
   */
  'operator:close-conversation': {
    name: 'operator:close-conversation'
    conversation: ClientAPI.Conversation
  }
  /**
   * Triggered when an operator moves a conversation to a new inbox.
   */
  'operator:move-conversation': {
    name: 'operator:move-conversation'
    from: ClientAPI.Inbox
    to: ClientAPI.Inbox
    conversation: ClientAPI.Conversation
  }
  /**
   * Triggered when a visitor clicks a button that has a callback.
   */
  'visitor:clicked-button': {
    name: 'visitor:clicked-button'
    conversation: ClientAPI.Conversation
    message: ClientAPI.ConversationItem
    button: ClientAPI.ConversationItem['buttons'][0]
  }
}
