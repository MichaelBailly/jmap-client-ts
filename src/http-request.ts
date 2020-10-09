export class HttpRequest {
  // constructor() { }

  public post(accessToken: string, url: string, content: object) {
    return this.request(accessToken, url, 'POST', content);
  }

  public get(accessToken: string, url: string) {
    return this.request(accessToken, url, 'GET');
  }

  private request(
    accessToken: string,
    url: string,
    method: 'POST' | 'GET',
    body?: object
  ) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.open(method, url);

      // TODO Header modified due to openpaas bug
      // request.setRequestHeader("Accept", "application/json;jmapVersion=rfc-8620")
      request.setRequestHeader(
        'Accept',
        'application/json;jmapVersion=rfc-8621'
      );
      request.setRequestHeader('Authorization', `Bearer ${accessToken}`);

      request.onload = () => {
        const status = request.status;
        if (status === 0 || (status >= 200 && status < 300)) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject(request.responseText);
        }
      };

      if (body) {
        request.send(JSON.stringify(body));
      } else {
        request.send();
      }
    });
  }
}
