import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "../../test/mock-http-client";
import faker from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
}

const makeSut = (URL_BASE: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(URL_BASE, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication Suite Tests', () => {
  test('Should call httpPostClient with correct URL', async () => {
    const URL_BASE = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(URL_BASE);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(URL_BASE);
  });
});
