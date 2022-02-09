import { AxiosHttpClient } from "./axios-http-client";
import { mockAxios } from "../test";
import { mockPostRequest } from "@/data/test/mock-http-post";
import axios from 'axios'

jest.mock('axios')

type sutTypes = {
  sut: AxiosHttpClient,
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): sutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios client with correct request values', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut();

    const promise = sut.post(mockPostRequest());

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
