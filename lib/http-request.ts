export class HttpRequest {

    constructor() {}

    request(url: string, method: "POST" | "GET", body?) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.setRequestHeader("Accept", "application/json;jmapVersion=rfc-8620")

            request.open(method, url);

            request.onreadystatechange = () => {
                if (request.readyState === XMLHttpRequest.DONE) {
                    let status = request.status;
                    if (status === 0 || (status >= 200 && status < 300)) {
                        resolve(JSON.parse(request.responseText));
                    } else {
                        reject(request.responseText);
                    }
                }
            };

            if (body) {
                request.send(JSON.stringify(body));
            } else {
                request.send();
            }
        });
    }

    post(url, content) {
        return this.request(url, "POST", content);
    }

    get(url) {
        return this.request(url, "GET");
    }
}