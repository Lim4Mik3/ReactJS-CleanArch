import { HttpPostClient } from "../../protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

describe('RemoteAuthentication Suite Tests', () => {
  test('Should call httpPostClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }

    const URL_BASE = 'any_url';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(URL_BASE, httpPostClientSpy);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(URL_BASE);
  });
});
