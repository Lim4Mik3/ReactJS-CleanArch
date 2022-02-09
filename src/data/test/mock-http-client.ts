import { HttpPostClient, HttpPostParams } from "@/data/protocols/http/http-post-client";
import { HttpResponse, HttpStatusCode } from "@/data/protocols/http/http-response";

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  };

  post({ url, body }: HttpPostParams): Promise<HttpResponse> {
    this.url = url;
    this.body = body;
    return Promise.resolve(this.response);
  }
}