export class HttpRequest {
  // constructor() { }

  public post(accessToken: string, url: string, content: object) {
    return this.request({ accessToken, url, method: 'POST', body: content });
  }

  public get(accessToken: string, url: string) {
    return this.request({ accessToken, url, method: 'GET' });
  }

  private request({
    accessToken,
    url,
    method,
    body,
    headers,
  }: {
    accessToken: string;
    url: string;
    method: 'POST' | 'GET';
    body?: object;
    headers?: { [headerName: string]: string };
  }) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.open(method, url);

      request.setRequestHeader(
        'Accept',
        headers?.Accept
          ? headers.accept
          : 'application/json;jmapVersion=rfc-8620'
      );

      request.setRequestHeader(
        'Authorization',
        headers?.Authorization ? headers.Authorization : `Bearer ${accessToken}`
      );

      request.onload = () => {
        const status = request.status;
        if (status === 0 || (status >= 200 && status < 300)) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject(request.responseText);
        }
      };

      const stringRequest = JSON.stringify(request);
      request.onerror = () => {
        reject(stringRequest);
      };

      if (body) {
        request.send(JSON.stringify(body));
      } else {
        request.send();
      }
    });
  }
}
