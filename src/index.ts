import { stringify } from 'querystring';
import { HttpRequest } from './http-request';
import { IInvocation, ISession, ITypeMap } from './types';

export class Client {
  private httpRequest: HttpRequest;

  private sessionUrl: string;
  private apiUrl: string | null = null;

  private accessToken: string;

  private session: ISession | null = null;

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
    return sessionPromise;
  }

  public clearSession() {
    this.session = null;
  }

  public invoke() {
    if (this.session === null) {
      throw new Error('The session should be fetch before ');
    }
    const result = this.httpRequest.post(
      this.accessToken,
      this.apiUrl ? this.apiUrl : this.session.apiUrl,
      this.methodCalls
    );

    this.methodCalls = [];

    return result;
  }

  public chain(
    methodName: keyof ITypeMap,
    args: {
      [argumentName: string]: any;
    },
    id: string
  ) {
    this.methodCalls.push([methodName, args, id]);
    return this;
  }
}
