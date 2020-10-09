export interface ITypeMap {
  ['Mailbox/get']: IMailbox;
}

/**
 * [ name, arguments, id ]
 */
export type IInvocation = [
  name: keyof ITypeMap,
  args: { [argumentName: string]: any },
  id: string
];

export interface IGetArguments<Properties> {
  accountId: string;
  ids: string[];
  properties: Properties[] | null;
}

export interface IRequest {
  using: string[];
  methodCalls: IInvocation[];
}

export interface ICapabilities {
  maxSizeUpload: number;
  maxConcurrentUpload: number;
  maxSizeRequest: number;
  maxConcurrentRequests: number;
  maxCallsInRequest: number;
  maxObjectsInGet: number;
  maxObjectsInSet: number;
  collationAlgorithms: string[];
}

export interface IAccount {
  name: string;
  isPersonal: boolean;
  isReadOnly: boolean;
  accountCapabilities: { [key: string]: any };
}

export interface ISession {
  capabilities: ICapabilities;
  accounts: { [accountId: string]: IAccount };
  primaryAccounts: { [key: string]: string };
  username: string;
  apiUrl: string;
  downloadUrl: string;
  uploadUrl: string;
  eventSourceUrl: string;
  state: string;
}

export type Emailer = string;

export type EmailHeader = string;

export type Attachment = File;

export interface IEmail {
  id: string;
  blobId: string;
  threadId: string;
  mailboxIds: { [key: string]: boolean };
  keywords: { [key: string]: boolean };
  from: Emailer[] | null;
  to: Emailer[] | null;
  subject: string;
  date: Date;
  size: number;
  preview: string;
  attachments: Attachment[] | null;
  createdModSeq: number;
  updatedModSeq: number;
  deleted: Date | null;
}

export interface IThreadEmail {
  id: string;
  mailboxIds: string[];
  isUnread: boolean;
  isFlagged: boolean;
}

export interface IThread {
  id: string;
  emails: IThreadEmail[];
  createdModSeq: number;
  updatedModSeq: number;
  deleted: Date | null;
}

export interface IMailbox {
  id: string;
  name: string;
  parentId: string | null;
  role: string;
  sortOrder: number;
  mayReadItems: boolean;
  mayAddItems: boolean;
  mayRemoveItems: boolean;
  mayCreateChild: boolean;
  mayRename: boolean;
  mayDelete: boolean;
  totalEmails: number;
  unreadEmails: number;
  totalThreads: number;
  unreadThreads: number;
  createdModSeq: number;
  updatedModSeq: number;
  updatedNotCounrsModSeq: number;
  deleted: Date | null;
  highestUID: number;
  emailHighestModSeq: number;
  emailListLowModSeq: number;
}

export interface IMaiboxEmailList {
  id: string; // mailboxId . (Max_Int64 - EmailDate) . uid
  messageId: string;
  updatedModSeq: number; // Documentation says it is string, must be an error
  created: Date;
  deleted: Date | null;
}

export interface IEmailChangeLog {
  id: string;
  created: string[];
  updated: string[];
  destroyed: string[];
}

export interface IThreadChangeLog {
  id: string;
  created: string[];
  updated: string[];
  destroyed: string[];
}

export interface IThreadRef {
  id: string; // hash(rfc822id) . hash(subject)
  threadId: string;
  lastSeen: Date;
}

export interface IHighLowModSeqCache {
  highModSeq: number;
  highModSeqEmail: number;
  highModSeqThread: number;
  highModSeqMailbox: number;
  lowModSeqEmail: number;
  lowModSeqThread: number;
  lowModSeqMailbox: number;
}

export interface IMessage {
  htmlBody: string;
}

export interface IEmailBodyValue {
  value: string;
  isEncodingProblem: boolean;
  isTruncated: boolean;
}

export interface IEmailBodyPart {
  partId: string;
  blobId: string;
  size: number;
  headers: EmailHeader[];
  name: string | null;
  type: string;
  charset: string | null;
  disposition: string | null;
  cid: string | null;
  language: string[] | null;
  location: string | null;
  subParts: IEmailBodyPart[] | null;
  bodyStructure: IEmailBodyPart;
  bodyValues: { [key: string]: IEmailBodyValue };
  textBody: IEmailBodyPart[]; // text/plain
  htmlBody: IEmailBodyPart[]; // text/html
  attachments: IEmailBodyPart[];
  hasAttachment: boolean;
  preview: string;
}
