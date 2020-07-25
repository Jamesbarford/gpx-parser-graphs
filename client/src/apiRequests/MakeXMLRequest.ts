export const enum HttpReqMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

type RequestOptions = {
    url: string;
    httpReqMethod: HttpReqMethod;
    body?: any;
    sendAsString?: boolean;
    requestHeaders?: Record<string, string>;
};

export class MakeXMLRequest {
    private readonly _xhr: XMLHttpRequest;

    private constructor(private readonly requestOptions: RequestOptions) {
        this._xhr = new XMLHttpRequest();
    }

    public static setupRequest(opts: RequestOptions): CancelableRequest {
        const makeXMLRequest: MakeXMLRequest = new MakeXMLRequest(opts);

        return new CancelableRequest(
            makeXMLRequest._makeRequest.bind(makeXMLRequest),
            makeXMLRequest.abort.bind(makeXMLRequest)
        );
    }

    private _makeRequest(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._xhr.onreadystatechange = () => {
                if (this._xhr.readyState !== XMLHttpRequest.DONE) return void 0;

                try {
                    const response: any = this._getResponse(
                        this._xhr.response,
                        this._xhr.getResponseHeader("content-type")
                    );

                    if (this._xhr.status >= 200 && this._xhr.status < 300) return resolve(response);
                    else return reject(response);
                } catch (e) {
                    return reject(e);
                }
            };

            this._xhr.open(
                this.requestOptions.httpReqMethod,
                "/api" + this.requestOptions.url,
                true
            );
            this._xhr.onerror = () => reject(new Error("Failed to make request"));
            this._setHeaders();

            this._xhr.send(
                this.requestOptions.sendAsString === false
                    ? this.requestOptions.body
                    : JSON.stringify(this.requestOptions.body)
            );
        });
    }

    private _getResponse(xhrResponse: any, contentType: string | null): any {
        if (contentType && contentType.includes("application/json")) return JSON.parse(xhrResponse);
        return xhrResponse;
    }

    private _setHeaders(): void {
        const { requestHeaders } = this.requestOptions;
        if (requestHeaders) {
            for (const name in requestHeaders) {
                this._xhr.setRequestHeader(name, requestHeaders[name]);
            }
        }
    }

    private abort(): void {
        if (this._xhr) this._xhr.abort();
    }
}

export class CancelableRequest {
    public constructor(
        public readonly makeRequest: () => Promise<any>,
        public readonly abort: () => void
    ) {
    }
}
