import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "@/data/test";
import { mockAuthentication, mockAccountModel } from "@/domain/test";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { HttpStatusCode } from "@/data/protocols/http";
import { AuthenticationParams } from "@/domain/useCases";
import { AccountModel } from "@/domain/models";
import faker from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
}

const makeSut = (URL_BASE: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
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

  test('Should throw UnexpectedError if httpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if httpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if httpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AccounModel if httpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    const httpResult = mockAccountModel();
    
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    };

    const account = await sut.auth(mockAuthentication());

    expect(account).toEqual(httpResult);
  });
});
