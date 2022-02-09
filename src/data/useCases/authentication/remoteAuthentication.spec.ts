import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { HttpStatusCode } from "@/data/protocols/http/http-response";

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

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(URL_BASE);
  });

  test('Should call httpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError if httpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  
});
