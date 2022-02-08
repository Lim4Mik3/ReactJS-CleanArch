import { HttpPostClient } from "../../protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

import { HttpPostClientSpy } from "../../test/mock-http-client";

describe('RemoteAuthentication Suite Tests', () => {
  test('Should call httpPostClient with correct URL', async () => {
    const URL_BASE = 'any_url';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(URL_BASE, httpPostClientSpy);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(URL_BASE);
  });
});
