import { HttpRequest } from './http-request';
import {
  IGetArguments,
  IInvocation,
  IMailbox,
  IMailboxProperties,
  ISession,
  ITypeMap,
} from './types';

export class Client {
  private httpRequest: HttpRequest;
  private httpHeaders: { [headerName: string]: string };

  private sessionUrl: string;
  private apiUrl: string | null = null;

  private accessToken: string;

  private methodCalls: IInvocation[] = [];

  constructor({
    sessionUrl,
    accessToken,
    apiUrl,
    httpRequest,
    httpHeaders,
  }: {
    sessionUrl: string;
    accessToken: string;
    apiUrl?: string;
    httpRequest?: HttpRequest;
    httpHeaders?: { [headerName: string]: string };
  }) {
    this.sessionUrl = sessionUrl;
    if (apiUrl) {
      this.apiUrl = apiUrl;
    }
    this.accessToken = accessToken;
    this.httpRequest = httpRequest ? httpRequest : new HttpRequest();
    this.httpHeaders = httpHeaders ? httpHeaders : {};
  }

  public fetchSession() {
    const sessionPromise = this.httpRequest.get(
      this.accessToken,
      this.sessionUrl
    ) as Promise<ISession>;
    sessionPromise.then((session) => {
      if (!this.apiUrl) {
        this.apiUrl = session.apiUrl;
      }
    });
    return sessionPromise;
  }

  public mailbox_get(
    args: IGetArguments<IMailboxProperties>,
    id?: string
  ): Promise<{
    sessionState: string;
    methodResponses: [
      [
        'Mailbox/get',
        {
          accountId: string;
          state: string;
          list: IMailbox[];
          notFound: string;
        },
        string
      ]
    ];
  }> {
    if (!this.apiUrl) {
      throw new Error('Unknown api url');
    }
    return this.httpRequest.post(this.accessToken, this.apiUrl, {
      using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:mail'],
      methodCalls: [['Mailbox/get', args, id]],
    }) as Promise<{
      sessionState: string;
      methodResponses: [
        [
          'Mailbox/get',
          {
            accountId: string;
            state: string;
            list: IMailbox[];
            notFound: string;
          },
          string
        ]
      ];
    }>;
  }
}
