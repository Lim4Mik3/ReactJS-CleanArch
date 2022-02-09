import { AxiosHttpClient } from "./axios-http-client";
import axios from 'axios'
import faker from '@faker-js/faker'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
}

describe('AxiosHttpClient', () => {
  test('Should call axios client with correct URL and verb', async () => {
    const URL_BASE = faker.internet.url();
    const sut = makeSut();

    await sut.post({ url: URL_BASE });

    expect(mockedAxios.post).toHaveBeenCalledWith(URL_BASE);
  });
  
});
