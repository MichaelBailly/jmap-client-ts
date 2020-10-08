import { stringify } from 'querystring';
import { HttpRequest } from './http-request';
import { Jmap } from './types';

export class Client {
    httpRequest: HttpRequest;

    sessionUrl: string;

    session: Jmap.Session = null

    methodCalls: Jmap.Invocation[] = [];

    constructor(sessionUrl: string, httpRequest?: HttpRequest) {
        this.sessionUrl = sessionUrl;
        if (httpRequest) {
            this.httpRequest = httpRequest;
        } else {
            this.httpRequest = new HttpRequest();
        }
    }

    fetchSession() {
        this.httpRequest.get(this.sessionUrl).then((value: Jmap.Session) => {this.session = value})
    }

    clearSession() {
        this.session = null;
    }

    invoke() {
        const result = this.httpRequest.post(this.session.apiUrl, this.methodCalls);

        this.methodCalls = [];

        return result;
    }

    chain(methodName: keyof Jmap.TypeMap, args: {
        [argumentName: string]: any
    }, id: string) {
        this.methodCalls.push([methodName, args, id])
        return this;
    }
}