import { HttpRequest } from './http-request';
import { IGetArguments, IInvocation, IMailbox, ISession, ITypeMap } from './types';

export class Client {
  private httpRequest: HttpRequest;

  private sessionUrl: string;
  private apiUrl: string | null = null;

  private accessToken: string;

  private methodCalls: IInvocation[] = [];

  constructor(
    sessionUrl: string,
    accessToken: string,
    apiUrl?: string,
    httpRequest?: HttpRequest
  ) {
    this.sessionUrl = sessionUrl;
    this.accessToken = accessToken;
    if (httpRequest) {
      this.httpRequest = httpRequest;
    } else {
      this.httpRequest = new HttpRequest();
    }
    if (apiUrl) {
      this.apiUrl = apiUrl;
    }
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

  // TODO Type the response
  public mailbox_get(args: IGetArguments<IMailbox>, id?: string): Promise<{
    sessionState: string,
    methodResponses: [
      [
        "Mailbox/get",
        {
          accountId: string,
          state: string,
          list: IMailbox[],
          notFound: string
        },
        string
      ]
    ]
  }> {
    if (!this.apiUrl) {
      throw new Error('Unknown api url');
    }
    return this.httpRequest.post(this.accessToken, this.apiUrl, {
      using:
        [
          "urn:ietf:params:jmap:core",
          "urn:ietf:params:jmap:mail"
        ],
      methodCalls: [
        [
          "Mailbox/get",
          args,
          id
        ]
      ]
    }) as Promise<{
      sessionState: string,
      methodResponses: [
        [
          "Mailbox/get",
          {
            accountId: string,
            state: string,
            list: IMailbox[],
            notFound: string
          },
          string
        ]
      ]
    }>;
  }
}
