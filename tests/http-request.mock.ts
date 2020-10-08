import { HttpRequest } from "../lib/http-request";

class HttpRequestMock extends HttpRequest {
    MOCK_SESSION_URL = "MOCK_SESSION_URL";
    MOCK_SESSION = {
        capabilities: null,
        accounts: { "MOCK_ACCOUNT_ID": null },
        primaryAccounts: { "MOCK_ACCOUNT_ID": null },
        username: "MOCK_USERNAME",
        apiUrl: "MOCK_API_URL",
        downloadUrl: null,
        uploadUrl: null,
        eventSourceUrl: null,
        state: null
    };


    post(url, content) {
        if (url !== this.MOCK_SESSION.apiUrl) {
            return Promise.reject("Wrong api url for mocks")
        }
        if (!content.methodCalls) {
            return Promise.reject("Missing methodCalls property for mocks")
        }
        if (content.methodCalls.length != 0) {
            return Promise.reject("Wrong number of method calls for mocks")
        }
        if (!content.methodCalls[0].accountId) {
            return Promise.reject("Missing methodCalls[0].accountId property for mocks")
        }

        return Promise.resolve({
            sessionState: null,
            methodResponses: [
                [
                    "Mailbox/get",
                    {
                        accountId: "MOCK_ACCOUNT_ID",
                        state: null,
                        list: [
                            {
                                id: "MOCK_MAILBOX1_ID",
                                name: "Mailbox 1",
                            },
                            {
                                id: "MOCK_MAILBOX2_ID",
                                name: "Mailbox 2",
                            },
                        ],
                        notFound: []
                    },
                    content.methodCalls[0].id
                ]
            ]
        });

    }

    get(url) {
        if (url !== this.MOCK_SESSION_URL) {
            return Promise.reject("Wrong session url for mocks")
        }

        return Promise.resolve(this.MOCK_SESSION);
    }
}