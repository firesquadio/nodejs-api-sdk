type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: string;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: string;
};


/**
 * In the case that this has been made by an API
 * there are the fields to render on the UI
 */
type ApiIntegration = {
  __typename?: 'APIIntegration';
  /** Display description of this integration, equivalent to a user title. */
  displayDescription?: Maybe<Scalars['String']>;
  /** Display name of this integration, equivalent to a user name. */
  displayName?: Maybe<Scalars['String']>;
  /** Avatar of this integration. */
  logoURL?: Maybe<Scalars['String']>;
};

/** Describes an attachment that may be attached to a message. */
type Attachment = {
  __typename?: 'Attachment';
  /** ID of the attachment */
  _id: Scalars['ID'];
  /** Extension of this attachment */
  extension: Scalars['String'];
  /** Name of the attachment */
  fileName: Scalars['String'];
  /** If true, this attachment has not been used on the app and it may be deleted. */
  pending: Scalars['Boolean'];
  /** Size (in bytes) of this file */
  size?: Maybe<Scalars['Float']>;
  /** If this attachment has been created, use this signed url to upload his content. */
  uploadUrl?: Maybe<Scalars['String']>;
  /** This boolean returns if the file has been already uploaded to s3. */
  uploaded: Scalars['Boolean'];
  /** URL to download this attachment */
  url?: Maybe<Scalars['String']>;
};

/** Describes the current type of authentication for a visitor. */
enum AuthenticationType {
  /**
   * Secure authentication via webhook, the customer service has been able
   * to validate the identity of the visitor.
   */
  Authenticated = 'authenticated',
  /** User has been authenticated via the client apis. */
  ClientAuth = 'clientAuth',
  /** User is a guest and has provided their name and email */
  Guest = 'guest',
  /**
   * Not authenticated, neither as guest nor as a visitor.
   * You will not be able to operate a conversation but can inspect knowledge base or other
   * static resurces.
   */
  Unauthenticated = 'unauthenticated'
}

/** Represents a block of code on the rich text editor. */
type CodeElement = {
  __typename?: 'CodeElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Content on this code element */
  children: Array<InlineTextElement>;
  /** Reference of the type, on this case, it will be 'code'. */
  type: Scalars['String'];
};

type Conversation = {
  __typename?: 'Conversation';
  _id: Scalars['ID'];
  answered: Scalars['Boolean'];
  assignedTo?: Maybe<MemberUser>;
  done: Scalars['Boolean'];
  inboxId: Scalars['ID'];
  lastItem?: Maybe<ConversationItem>;
  visitor: Visitor;
  visitorId: Scalars['ID'];
};

/** Button set card, used to ask for actions or links to the customer. */
type ConversationButtonCard = {
  __typename?: 'ConversationButtonCard';
  /** Describes the type of card to be shown. */
  type: ConversationCardType;
};

/** Joins all type of existings cards. */
type ConversationCard = ConversationButtonCard | ConversationContentCard;

type ConversationCardInput = {
  /**
   * Used to display a small icon on the header of the card,
   * in the case of unfurl, it display the favicon of the previewed page.
   */
  appIcon?: Maybe<Scalars['String']>;
  /**
   * Used to display a small title on the header of the card,
   * in case of unfurl, it displays the <title> tag of the previewed page.
   */
  appTitle?: Maybe<Scalars['String']>;
  /** Text describing the content of the card. */
  description?: Maybe<Scalars['String']>;
  /** Image to display in the card, it is optional. */
  image?: Maybe<Scalars['String']>;
  /** Optional clickable link on this card. */
  link?: Maybe<Scalars['String']>;
  /**
   * Title to display on the card, if this card also has a link, this title
   * becomes an anchor tag to such link.
   */
  title?: Maybe<Scalars['String']>;
  /** Describes the type of card to be shown. */
  type: ConversationCardType;
};

/** Describes who created this card */
enum ConversationCardSender {
  /** This card has been created by an API Integration call. */
  Api = 'api',
  /** This card has been created by a trigger (TBD). */
  Trigger = 'trigger',
  /** This card has been created by the unfurl service. */
  Unfurl = 'unfurl'
}

/** Describes how this card is going to be shown. */
enum ConversationCardType {
  /** This card is going to be shown as a set of buttons. */
  Buttons = 'buttons',
  /** This card is going to be shown as a default content card. */
  Card = 'card'
}

/** Describes the main content of a conversation item. */
type ConversationContent = {
  __typename?: 'ConversationContent';
  /** Identifier of this conversation content. */
  _id: Scalars['ID'];
  /** If this content has a reference to any API integration, it's shown here. */
  apis: Array<ApiIntegration>;
  /** If this content has a reference to any inbox, it's shown here. */
  inboxes: Array<Inbox>;
  /** A message to show in the chat bubble. */
  message: Array<ParagraphElement>;
  /** Plain text representation of the message. */
  messageString?: Maybe<Scalars['String']>;
  /** Describes the type of message, different types renders of different ways on the UI. */
  type: ConversationContentType;
  /** If this content has a reference to any user, it's shown here. */
  users: Array<MemberUser>;
};

/**
 * Default content card, used to display rich information in the UI, and also by
 * our unfurl service to preview links.
 */
type ConversationContentCard = {
  __typename?: 'ConversationContentCard';
  /**
   * Used to display a small icon on the header of the card,
   * in the case of unfurl, it display the favicon of the previewed page.
   */
  appIcon?: Maybe<Scalars['String']>;
  /**
   * Used to display a small title on the header of the card,
   * in case of unfurl, it displays the <title> tag of the previewed page.
   */
  appTitle?: Maybe<Scalars['String']>;
  /** Describes who created this card. */
  createdBy: ConversationCardSender;
  /** Text describing the content of the card. */
  description?: Maybe<Scalars['String']>;
  /** Image to display in the card, it is optional. */
  image?: Maybe<Scalars['String']>;
  /** Optional clickable link on this card. */
  link?: Maybe<Scalars['String']>;
  /**
   * Title to display on the card, if this card also has a link, this title
   * becomes an anchor tag to such link.
   */
  title: Scalars['String'];
  /** Describes the type of card to be shown. */
  type: ConversationCardType;
};

/** Extra (non-text) content types */
enum ConversationContentMessageChildrenType {
  /** Render this element as a link. */
  Link = 'link'
}

/** Root type of content */
enum ConversationContentMessageType {
  /** Display a paragraph. */
  Paragraph = 'paragraph'
}

/** Describes the type of message, different types renders of different ways on the UI. */
enum ConversationContentType {
  /** This message is the result of a operator assigning other opreator to this conversation. */
  AssignEvent = 'assignEvent',
  /** This message is the result of the conversation being closed as done. */
  Close = 'close',
  /** This marks the message as a default message, with the intent to communicate with the other party (or internally with other operators). */
  Message = 'message',
  /** This message is the result of the conversation being moved from an inbox to other. */
  MoveEvent = 'moveEvent',
  /** This message is the result of a operator assigning itself to this conversation. */
  SelfAssignEvent = 'selfAssignEvent',
  /** This message is the result of a operator removing his assignment from this conversation. */
  SelfUnassignEvent = 'selfUnassignEvent',
  /** This message is the result of a operator removing the assignment of this conversation. */
  UnassignEvent = 'unassignEvent'
}

/**
 * Conversation items are the unit of our conversations, describing each message shared,
 * it may contain cards, message and/or attachments.
 */
type ConversationItem = {
  __typename?: 'ConversationItem';
  /** Identifier of this message. */
  _id: Scalars['ID'];
  /** List of file attachments that this message may have. */
  attachments: Array<Attachment>;
  /** A card that may be linked on this conversation item. */
  card?: Maybe<ConversationCard>;
  /** Content of this message. */
  content: ConversationContent;
  /** ID of the conversation where this message belongs. */
  conversationId: Scalars['ID'];
  /** Stamp of this message creation. */
  createdAt: Scalars['DateTime'];
  internal: Scalars['Boolean'];
  /** Describes who sent this message. */
  sender: Sender;
  senderId: Scalars['ID'];
  /** Describes the type of who sent this message. */
  senderType: ConversationSenderType;
  visitor: Visitor;
  visitorId: Scalars['ID'];
};

/** Describes the main content of a conversation item. */
type ConversationItemContentInput = {
  /** A message to show in the chat bubble. */
  message: Array<ConversationItemContentMessageInput>;
};

/** Input children texts on the paragraph case. */
type ConversationItemContentMessageChildrenInput = {
  /**
   * For: Text.
   * Describes if is bold class applied to this text.
   */
  bold?: Maybe<Scalars['Boolean']>;
  /**
   * For: Link.
   * Children text to be contained on this link.
   */
  children?: Maybe<Array<ConversationItemContentMessageChildrenInput>>;
  /**
   * For: Text.
   * Describes if is italic class applied to this text.
   */
  italic?: Maybe<Scalars['Boolean']>;
  /**
   * For: Text.
   * Text to be displayed.
   */
  text?: Maybe<Scalars['String']>;
  /** If is no text, may have a type */
  type?: Maybe<ConversationContentMessageChildrenType>;
  /**
   * For: Text.
   * Describes if is underline class applied to this text.
   */
  underline?: Maybe<Scalars['Boolean']>;
  /**
   * For: Link.
   * URL (href) of the said link.
   */
  url?: Maybe<Scalars['String']>;
};

/** Describes a message that is shown as a bubble of text on the UI. */
type ConversationItemContentMessageInput = {
  /** Content of this paragraph. */
  children: Array<ConversationItemContentMessageChildrenInput>;
  /** Block Type of this paragraph, for now, only paragraphs are supported. */
  type: ConversationContentMessageType;
};

type ConversationItemInput = {
  /** A card that may be linked on this conversation item. */
  card?: Maybe<ConversationCardInput>;
  /** Content of this message. */
  content: ConversationItemContentInput;
  /** True if this message is meant only for operators. */
  internal: Scalars['Boolean'];
  /** If its true, it will not generate a preview for link (if available). */
  skip_unfurl?: Maybe<Scalars['Boolean']>;
};

/** Describes the type of who sent this message. */
enum ConversationSenderType {
  /** This message was sent via an API Integration. */
  Api = 'api',
  /** This message was sent by an Operator (aka App User, Dashboard User, Member User). */
  Operator = 'operator',
  /** This message was sent by an Visitor (aka Wiget User, aka Customer). */
  Visitor = 'visitor'
}



enum ErrorCodes {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND'
}

type GenericResponse = {
  __typename?: 'GenericResponse';
  ok?: Maybe<Scalars['Boolean']>;
};

/** Represents a heading on the rich text editor. */
type HeadingElement = {
  __typename?: 'HeadingElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Content on this heading */
  children: Array<InlineTextElement>;
  /** Heading type */
  heading: Scalars['String'];
  /** Reference of the type, on this case is 'heading'. */
  type: Scalars['String'];
};

/** Represents an embeddable frame on the rich text editor. */
type IframeElement = {
  __typename?: 'IframeElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Should be always empty but required by the text editor. */
  children: Array<InlineTextElement>;
  /** Reference of the type, on this case, it will be 'iframe'. */
  type: Scalars['String'];
  /** URL of the frame associated with this element. */
  url: Scalars['String'];
};

/** Represents an image on the rich text editor. */
type ImageElement = {
  __typename?: 'ImageElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Should be always empty but required by the text editor. */
  children: Array<InlineTextElement>;
  /** ID of the attachment associated with this element. */
  id: Scalars['String'];
  /** Reference of the type, on this case, it will be 'img'. */
  type: Scalars['String'];
  /** URL of the attachment associated with this element. */
  url: Scalars['String'];
};

/** An inbox is a internal group that holds operator and conversations. */
type Inbox = {
  __typename?: 'Inbox';
  /** ID of this resource. */
  _id: Scalars['ID'];
  /** The way that new and moved conversation are assigned by default. */
  assignStrategy: InboxAssignStrategy;
  /** If the assignment is fixed, this sets which user should be assigned. */
  assignTo?: Maybe<Scalars['ID']>;
  /** Timestamp of creation */
  createdAt: Scalars['DateTime'];
  /** Name of this inbox. */
  name: Scalars['String'];
  /**
   * Work schedule of this inbox, for presentation
   * purposes.
   */
  workWeek: WorkWeek;
};

/** Describes the possible assignation strategies available for inboxes. */
enum InboxAssignStrategy {
  /** Will assign incoming conversations to the less charged operator on your inbox. */
  AutoAssignLessCharged = 'autoAssignLessCharged',
  /** Will assign to a fixed user. */
  FixedAssign = 'fixedAssign',
  /** On a new conversation, it will leave it unassigned. */
  LeaveUnassigned = 'leaveUnassigned'
}

/** A paragraph may have different type of children, those are defined here. */
type InlineElement = InlineLinkElement | InlineMentionElement | InlineReplaceElement | InlineTextElement;

/** Chunk of text displayed as a link (anchor tag). */
type InlineLinkElement = {
  __typename?: 'InlineLinkElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Text to be displayed on this link. */
  children?: Maybe<Array<InlineTextElement>>;
  /** Reference of the type, on this case, it will be 'link'. */
  type: Scalars['String'];
  /** URL (href) of the said link. */
  url: Scalars['String'];
};

/** Represents a mention to another user */
type InlineMentionElement = {
  __typename?: 'InlineMentionElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Text to be displayed on this mention. */
  children?: Maybe<Array<InlineTextElement>>;
  /** Content to show within the mention element. */
  content: Scalars['String'];
  /** Reference of the type, on this case, it will be 'mention'. */
  type: Scalars['String'];
  /** UserId of the mentioned */
  user: Scalars['String'];
};

/** Represents a variable to be replaced */
type InlineReplaceElement = {
  __typename?: 'InlineReplaceElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Text to be displayed on this replace. */
  children?: Maybe<Array<InlineTextElement>>;
  /** Content to show within the replaced element. */
  content: Scalars['String'];
  /** Reprecents which value should be replaced */
  replaceWith: Scalars['String'];
  /** Reference of the type, on this case it will be 'replaceWith'. */
  type: Scalars['String'];
};

/** Chunk of text displayed as plain text. */
type InlineTextElement = {
  __typename?: 'InlineTextElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Describes if is bold class applied to this text. */
  bold?: Maybe<Scalars['Boolean']>;
  /** Describes if is italic class applied to this text. */
  italic?: Maybe<Scalars['Boolean']>;
  /** Text to be displayed. */
  text: Scalars['String'];
  /** Describes if is underline class applied to this text. */
  underline?: Maybe<Scalars['Boolean']>;
};

/** Represents a item within a list. */
type ListElement = {
  __typename?: 'ListElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Text to be displayed on this list item. */
  children?: Maybe<Array<InlineTextElement>>;
  /** Reference of the type, on this case it will be 'li'. */
  type: Scalars['String'];
};

/**
 * A member is an operator of the platform, representing the company
 * that you're writing to.
 */
type MemberUser = {
  __typename?: 'MemberUser';
  /** ID of the user. */
  _id: Scalars['ID'];
  /** Email of the user. */
  email?: Maybe<Scalars['String']>;
  /** User First Name. */
  firstName: Scalars['String'];
  /** User Last Name. */
  lastName: Scalars['String'];
  /** User Avatar logo */
  logoURL?: Maybe<Scalars['String']>;
  /** Computed name of the user (lastname + firstname). */
  name?: Maybe<Scalars['String']>;
  /** User Phone */
  phone?: Maybe<Scalars['String']>;
  /** Title of the user */
  title?: Maybe<Scalars['String']>;
};

type Mutation = {
  __typename?: 'Mutation';
  /** Authenticates an user via webhook auth. */
  Authenticate: Visitor;
  /** Mark this conversation as closed. */
  CloseConversation: Conversation;
  /** Move conversation to another inbox. */
  MoveConversation: Conversation;
  /** Post a message into the conversation. */
  PostConversationItem: ConversationItem;
  /** Updates user attributes (showed on the dashboard UI) of an existing visitor. */
  UpdateAttributes: Visitor;
};


type MutationAuthenticateArgs = {
  data: VisitorInput;
  visitorId: Scalars['ID'];
};


type MutationCloseConversationArgs = {
  id: Scalars['ID'];
};


type MutationMoveConversationArgs = {
  id: Scalars['ID'];
  inboxId: Scalars['ID'];
};


type MutationPostConversationItemArgs = {
  data: ConversationItemInput;
  id: Scalars['ID'];
};


type MutationUpdateAttributesArgs = {
  attributes: Array<VisitorAttributeCategoryInput>;
  visitorId: Scalars['ID'];
};

type OrderedListElement = {
  __typename?: 'OrderedListElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** List elements on this list. */
  children: Array<ListElement>;
  /** Reference of the type, on this case, it will be 'ol'. */
  type: Scalars['String'];
};

type PageInfo = {
  __typename?: 'PageInfo';
  end?: Maybe<Scalars['String']>;
  hasNext?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['String']>;
};

/** Represents a paragraph on the rich text editor. */
type ParagraphElement = {
  __typename?: 'ParagraphElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Content on this paragraph. */
  children: Array<InlineElement>;
  /** Reference of the type, on this case, it will be 'paragraph'. */
  type: Scalars['String'];
};

type Query = {
  __typename?: 'Query';
  /** Retrieves a conversation */
  Conversation: Conversation;
  /** Retrieves a visitor by ID. */
  Visitor: Visitor;
};


type QueryConversationArgs = {
  id: Scalars['ID'];
};


type QueryVisitorArgs = {
  id: Scalars['ID'];
};

/** Represents a quote on the rich text editor. */
type QuoteElement = {
  __typename?: 'QuoteElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** Content on this quote element */
  children: Array<InlineTextElement>;
  /** Reference of the type, on this case, it will be 'blockquote'. */
  type: Scalars['String'];
};

type S3Upload = {
  __typename?: 'S3Upload';
  url: Scalars['String'];
};

/** Describes who sent this message. */
type Sender = ApiIntegration | MemberUser | Visitor;


type UnorderedListElement = {
  __typename?: 'UnorderedListElement';
  /** Id of item. */
  _id: Scalars['ID'];
  /** List elements on this list. */
  children: Array<ListElement>;
  /** Reference of the type, on this case, it will be 'ul'. */
  type: Scalars['String'];
};

/** Represents the user using the widget */
type Visitor = {
  __typename?: 'Visitor';
  /** Identifier of this visitor */
  _id: Scalars['ID'];
  /** Attributes set to the current visitor. */
  attributes?: Maybe<Array<VisitorAttributeCategory>>;
  /** Email of the visitor */
  email?: Maybe<Scalars['String']>;
  /** Image of the visitor */
  image?: Maybe<Scalars['String']>;
  /** Name of the visitor */
  name?: Maybe<Scalars['String']>;
  /** Authentication Type of the visitor. */
  type: AuthenticationType;
};

/** Type of a single attribute shown on the UI */
type VisitorAttribute = {
  __typename?: 'VisitorAttribute';
  /** Name of the attribute */
  name: Scalars['String'];
  /** Type of the attribute */
  type: VisitorAttributeType;
  /** Value of the attribute */
  value: Scalars['String'];
};

/** A AttributeCategory is a group of attributes */
type VisitorAttributeCategory = {
  __typename?: 'VisitorAttributeCategory';
  /** Attributes contained in this group */
  attributes?: Maybe<Array<VisitorAttribute>>;
  /** Name of the group */
  name: Scalars['String'];
};

/** A AttributeCategory is a group of attributes */
type VisitorAttributeCategoryInput = {
  /** Attributes contained in this group */
  attributes?: Maybe<Array<VisitorAttributeInput>>;
  /** Name of the group */
  name: Scalars['String'];
};

/** Type of a single attribute shown on the UI */
type VisitorAttributeInput = {
  /** Name of the attribute */
  name: Scalars['String'];
  /** Type of the attribute */
  type: VisitorAttributeType;
  /** Value of the attribute */
  value: Scalars['String'];
};

/** The Atrribute Type controls how the attribute shows on the UI */
enum VisitorAttributeType {
  /** Will render as a link */
  Link = 'link',
  /** Will render as a text */
  Text = 'text'
}

/** Input to authenticate the visitor. */
type VisitorInput = {
  /** Attributes to set on this request */
  attributes?: Maybe<Array<VisitorAttributeCategoryInput>>;
  /** Email of the visitor */
  email: Scalars['String'];
  /** Image of the visitor. */
  image?: Maybe<Scalars['String']>;
  /** Name of the visitor */
  name: Scalars['String'];
};

/** A Unit of work explaining which hours the company operates on such day */
type WorkHourRule = {
  __typename?: 'WorkHourRule';
  /** Starting hour of the shift. */
  from: Scalars['String'];
  /** Ending hour of the shift. */
  to: Scalars['String'];
};

/** A Unit of work explaining which hours the company operates on such day */
type WorkHourRuleInput = {
  /** Starting hour of the shift. */
  from: Scalars['String'];
  /** Ending hour of the shift. */
  to: Scalars['String'];
};

/** Describes the week working shedule assigned for this widget */
type WorkWeek = {
  __typename?: 'WorkWeek';
  /** Friday work rules */
  friday: Array<WorkHourRule>;
  /** Ugh, mondays! */
  monday: Array<WorkHourRule>;
  /** Saturday work rules */
  saturday: Array<WorkHourRule>;
  /** Sunday work rules */
  sunday: Array<WorkHourRule>;
  /** Thursday work rules */
  thursday: Array<WorkHourRule>;
  /** Timezone of the workweek */
  timezone: Scalars['String'];
  /** Tuesday work rules */
  tuesday: Array<WorkHourRule>;
  /** Wednesday work rules */
  wednesday: Array<WorkHourRule>;
};

/** Describes the week working shedule assigned for this widget */
type WorkWeekInput = {
  /** Friday work rules */
  friday: Array<WorkHourRuleInput>;
  /** Ugh, mondays! */
  monday: Array<WorkHourRuleInput>;
  /** Saturday work rules */
  saturday: Array<WorkHourRuleInput>;
  /** Sunday work rules */
  sunday: Array<WorkHourRuleInput>;
  /** Thursday work rules */
  thursday: Array<WorkHourRuleInput>;
  /** Timezone of the workweek */
  timezone: Scalars['String'];
  /** Tuesday work rules */
  tuesday: Array<WorkHourRuleInput>;
  /** Wednesday work rules */
  wednesday: Array<WorkHourRuleInput>;
};

import crypto from 'crypto'
import fetch from 'cross-fetch'

type GraphQLError = {
  message: string
  path: string[]
  extensions?: { code?: string }
}

type Request<key extends string | number | symbol> = {
  query: string
  operationName: key
  variables: Record<string, unknown>
}

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
    return crypto
      .createHmac('sha256', this.apiKey)
      .update(payload)
      .digest('hex')
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
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-signature-sha-256': this.signPayload(body),
        },
      })

      if (res.ok) {
        const data = await res.json()
        this.token = data.token
        return this.token
      }

      if (res.status === 400)
        throw new AuthenticationError(`Incorrect credentials.`)

      throw new UnexpectedError(`Failed to exchange token`, {
        res,
        json: await res.json(),
      })
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
        const token = JSON.parse(
          Buffer.from(this.token.split('.')[1], 'base64').toString('utf-8')
        )
        return !token || date >= token.exp * 1000
          ? await this.refreshToken()
          : this.token
      }

      return await this.refreshToken()
    } catch (e) {
      return await this.refreshToken()
    }
  }

  private async doRequest<key extends keyof res, res = Record<key, unknown>>(
    request: Request<key>
  ): Promise<res[key]> {
    const req = await fetch(`${this.apiUrl}/graphql`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await this.getToken()}`,
      },
      body: JSON.stringify({
        query: request.query,
        variables: request.variables,
        operationName: request.operationName,
      }),
    })

    const { data, errors } = await req.json()
    if (errors) throw new OperationError(errors)

    return data?.[request.operationName]
  }

  
      
  /** Retrieves a conversation */
  public async Conversation(id: Scalars['ID']) {
    return await this.doRequest<'Conversation', { Conversation: Conversation }>({
      query: `query Conversation($id: ID!) {
  Conversation(id: $id) {
    _id
    answered
    assignedTo {
      _id
      email
      firstName
      lastName
      logoURL
      name
      phone
      title
    }
    done
    inboxId
    lastItem {
      _id
      attachments {
        _id
        extension
        fileName
        pending
        size
        uploadUrl
        uploaded
        url
      }
      card {
        ... on ConversationButtonCard {
          type
        }
        ... on ConversationContentCard {
          appIcon
          appTitle
          createdBy
          description
          image
          link
          title
          type
        }
      }
      content {
        _id
        apis {
          displayDescription
          displayName
          logoURL
        }
        inboxes {
          _id
          assignStrategy
          assignTo
          createdAt
          name
          workWeek {
            friday {
              from
              to
            }
            monday {
              from
              to
            }
            saturday {
              from
              to
            }
            sunday {
              from
              to
            }
            thursday {
              from
              to
            }
            timezone
            tuesday {
              from
              to
            }
            wednesday {
              from
              to
            }
          }
        }
        message {
          _id
          children {
            ... on InlineLinkElement {
              _id
              children {
                _id
                bold
                italic
                text
                underline
              }
              type
              url
            }
            ... on InlineMentionElement {
              _id
              children {
                _id
                bold
                italic
                text
                underline
              }
              content
              type
              user
            }
            ... on InlineReplaceElement {
              _id
              children {
                _id
                bold
                italic
                text
                underline
              }
              content
              replaceWith
              type
            }
            ... on InlineTextElement {
              _id
              bold
              italic
              text
              underline
            }
          }
          type
        }
        messageString
        type
        users {
          _id
          email
          firstName
          lastName
          logoURL
          name
          phone
          title
        }
      }
      conversationId
      createdAt
      internal
      sender {
        ... on APIIntegration {
          displayDescription
          displayName
          logoURL
        }
        ... on MemberUser {
          _id
          email
          firstName
          lastName
          logoURL
          name
          phone
          title
        }
        ... on Visitor {
          _id
          attributes {
            attributes {
              name
              type
              value
            }
            name
          }
          email
          image
          name
          type
        }
      }
      senderId
      senderType
      visitor {
        _id
        attributes {
          attributes {
            name
            type
            value
          }
          name
        }
        email
        image
        name
        type
      }
      visitorId
    }
    visitor {
      _id
      attributes {
        attributes {
          name
          type
          value
        }
        name
      }
      email
      image
      name
      type
    }
    visitorId
  }
}`,
      variables: { id },
      operationName: "Conversation"
    })
  }

  /** Retrieves a visitor by ID. */
  public async Visitor(id: Scalars['ID']) {
    return await this.doRequest<'Visitor', { Visitor: Visitor }>({
      query: `query Visitor($id: ID!) {
  Visitor(id: $id) {
    _id
    attributes {
      attributes {
        name
        type
        value
      }
      name
    }
    email
    image
    name
    type
  }
}`,
      variables: { id },
      operationName: "Visitor"
    })
  }
      
  /** Authenticates an user via webhook auth. */
  public async Authenticate(data: VisitorInput, visitorId: Scalars['ID']) {
    return await this.doRequest<'Authenticate', { Authenticate: Visitor }>({
      query: `mutation Authenticate($data: VisitorInput!, $visitorId: ID!) {
  Authenticate(data: $data, visitorId: $visitorId) {
    _id
    attributes {
      attributes {
        name
        type
        value
      }
      name
    }
    email
    image
    name
    type
  }
}`,
      variables: { data, visitorId },
      operationName: "Authenticate"
    })
  }

  /** Mark this conversation as closed. */
  public async CloseConversation(id: Scalars['ID']) {
    return await this.doRequest<'CloseConversation', { CloseConversation: Conversation }>({
      query: `mutation CloseConversation($id: ID!) {
  CloseConversation(id: $id) {
    _id
    answered
    assignedTo {
      _id
      email
      firstName
      lastName
      logoURL
      name
      phone
      title
    }
    done
    inboxId
    lastItem {
      _id
      attachments {
        _id
        extension
        fileName
        pending
        size
        uploadUrl
        uploaded
        url
      }
      card {
        ... on ConversationButtonCard {
          type
        }
        ... on ConversationContentCard {
          appIcon
          appTitle
          createdBy
          description
          image
          link
          title
          type
        }
      }
      content {
        _id
        apis {
          displayDescription
          displayName
          logoURL
        }
        inboxes {
          _id
          assignStrategy
          assignTo
          createdAt
          name
          workWeek {
            friday {
              from
              to
            }
            monday {
              from
              to
            }
            saturday {
              from
              to
            }
            sunday {
              from
              to
            }
            thursday {
              from
              to
            }
            timezone
            tuesday {
              from
              to
            }
            wednesday {
              from
              to
            }
          }
        }
        message {
          _id
          children {
            ... on InlineLinkElement {
              _id
              children {
                _id
                bold
                italic
                text
                underline
              }
              type
              url
            }
            ... on InlineMentionElement {
              _id
              children {
                _id
                bold
                italic
                text
                underline
              }
              content
              type
              user
            }
            ... on InlineReplaceElement {
              _id
              children {
                _id
                bold
                italic
                text
                underline
              }
              content
              replaceWith
              type
            }
            ... on InlineTextElement {
              _id
              bold
              italic
              text
              underline
            }
          }
          type
        }
        messageString
        type
        users {
          _id
          email
          firstName
          lastName
          logoURL
          name
          phone
          title
        }
      }
      conversationId
      createdAt
      internal
      sender {
        ... on APIIntegration {
          displayDescription
          displayName
          logoURL
        }
        ... on MemberUser {
          _id
          email
          firstName
          lastName
          logoURL
          name
          phone
          title
        }
        ... on Visitor {
          _id
          attributes {
            attributes {
              name
              type
              value
            }
            name
          }
          email
          image
          name
          type
        }
      }
      senderId
      senderType
      visitor {
        _id
        attributes {
          attributes {
            name
            type
            value
          }
          name
        }
        email
        image
        name
        type
      }
      visitorId
    }
    visitor {
      _id
      attributes {
        attributes {
          name
          type
          value
        }
        name
      }
      email
      image
      name
      type
    }
    visitorId
  }
}`,
      variables: { id },
      operationName: "CloseConversation"
    })
  }

  /** Move conversation to another inbox. */
  public async MoveConversation(id: Scalars['ID'], inboxId: Scalars['ID']) {
    return await this.doRequest<'MoveConversation', { MoveConversation: Conversation }>({
      query: `mutation MoveConversation($id: ID!, $inboxId: ID!) {
  MoveConversation(id: $id, inboxId: $inboxId) {
    _id
    answered
    assignedTo {
      _id
      email
      firstName
      lastName
      logoURL
      name
      phone
      title
    }
    done
    inboxId
    lastItem {
      _id
      attachments {
        _id
        extension
        fileName
        pending
        size
        uploadUrl
        uploaded
        url
      }
      card {
        ... on ConversationButtonCard {
          type
        }
        ... on ConversationContentCard {
          appIcon
          appTitle
          createdBy
          description
          image
          link
          title
          type
        }
      }
      content {
        _id
        apis {
          displayDescription
          displayName
          logoURL
        }
        inboxes {
          _id
          assignStrategy
          assignTo
          createdAt
          name
          workWeek {
            friday {
              from
              to
            }
            monday {
              from
              to
            }
            saturday {
              from
              to
            }
            sunday {
              from
              to
            }
            thursday {
              from
              to
            }
            timezone
            tuesday {
              from
              to
            }
            wednesday {
              from
              to
            }
          }
        }
        message {
          _id
          children {
            ... on InlineLinkElement {
              _id
              children {
                _id
                bold
                italic
                text
                underline
              }
              type
              url
            }
            ... on InlineMentionElement {
              _id
              children {
                _id
                bold
                italic
                text
                underline
              }
              content
              type
              user
            }
            ... on InlineReplaceElement {
              _id
              children {
                _id
                bold
                italic
                text
                underline
              }
              content
              replaceWith
              type
            }
            ... on InlineTextElement {
              _id
              bold
              italic
              text
              underline
            }
          }
          type
        }
        messageString
        type
        users {
          _id
          email
          firstName
          lastName
          logoURL
          name
          phone
          title
        }
      }
      conversationId
      createdAt
      internal
      sender {
        ... on APIIntegration {
          displayDescription
          displayName
          logoURL
        }
        ... on MemberUser {
          _id
          email
          firstName
          lastName
          logoURL
          name
          phone
          title
        }
        ... on Visitor {
          _id
          attributes {
            attributes {
              name
              type
              value
            }
            name
          }
          email
          image
          name
          type
        }
      }
      senderId
      senderType
      visitor {
        _id
        attributes {
          attributes {
            name
            type
            value
          }
          name
        }
        email
        image
        name
        type
      }
      visitorId
    }
    visitor {
      _id
      attributes {
        attributes {
          name
          type
          value
        }
        name
      }
      email
      image
      name
      type
    }
    visitorId
  }
}`,
      variables: { id, inboxId },
      operationName: "MoveConversation"
    })
  }

  /** Post a message into the conversation. */
  public async PostConversationItem(data: ConversationItemInput, id: Scalars['ID']) {
    return await this.doRequest<'PostConversationItem', { PostConversationItem: ConversationItem }>({
      query: `mutation PostConversationItem($data: ConversationItemInput!, $id: ID!) {
  PostConversationItem(data: $data, id: $id) {
    _id
    attachments {
      _id
      extension
      fileName
      pending
      size
      uploadUrl
      uploaded
      url
    }
    card {
      ... on ConversationButtonCard {
        type
      }
      ... on ConversationContentCard {
        appIcon
        appTitle
        createdBy
        description
        image
        link
        title
        type
      }
    }
    content {
      _id
      apis {
        displayDescription
        displayName
        logoURL
      }
      inboxes {
        _id
        assignStrategy
        assignTo
        createdAt
        name
        workWeek {
          friday {
            from
            to
          }
          monday {
            from
            to
          }
          saturday {
            from
            to
          }
          sunday {
            from
            to
          }
          thursday {
            from
            to
          }
          timezone
          tuesday {
            from
            to
          }
          wednesday {
            from
            to
          }
        }
      }
      message {
        _id
        children {
          ... on InlineLinkElement {
            _id
            children {
              _id
              bold
              italic
              text
              underline
            }
            type
            url
          }
          ... on InlineMentionElement {
            _id
            children {
              _id
              bold
              italic
              text
              underline
            }
            content
            type
            user
          }
          ... on InlineReplaceElement {
            _id
            children {
              _id
              bold
              italic
              text
              underline
            }
            content
            replaceWith
            type
          }
          ... on InlineTextElement {
            _id
            bold
            italic
            text
            underline
          }
        }
        type
      }
      messageString
      type
      users {
        _id
        email
        firstName
        lastName
        logoURL
        name
        phone
        title
      }
    }
    conversationId
    createdAt
    internal
    sender {
      ... on APIIntegration {
        displayDescription
        displayName
        logoURL
      }
      ... on MemberUser {
        _id
        email
        firstName
        lastName
        logoURL
        name
        phone
        title
      }
      ... on Visitor {
        _id
        attributes {
          attributes {
            name
            type
            value
          }
          name
        }
        email
        image
        name
        type
      }
    }
    senderId
    senderType
    visitor {
      _id
      attributes {
        attributes {
          name
          type
          value
        }
        name
      }
      email
      image
      name
      type
    }
    visitorId
  }
}`,
      variables: { data, id },
      operationName: "PostConversationItem"
    })
  }

  /** Updates user attributes (showed on the dashboard UI) of an existing visitor. */
  public async UpdateAttributes(attributes: Array<VisitorAttributeCategoryInput>, visitorId: Scalars['ID']) {
    return await this.doRequest<'UpdateAttributes', { UpdateAttributes: Visitor }>({
      query: `mutation UpdateAttributes($attributes: [VisitorAttributeCategoryInput!]!, $visitorId: ID!) {
  UpdateAttributes(attributes: $attributes, visitorId: $visitorId) {
    _id
    attributes {
      attributes {
        name
        type
        value
      }
      name
    }
    email
    image
    name
    type
  }
}`,
      variables: { attributes, visitorId },
      operationName: "UpdateAttributes"
    })
  }
    
}
