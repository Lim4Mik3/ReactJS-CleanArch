import { AxiosHttpClient } from "./axios-http-client";
import axios from 'axios'
import faker from '@faker-js/faker'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
  test('Should call axios client with correct URL', async () => {
    const URL_BASE = faker.internet.url();
    const sut = new AxiosHttpClient();

    await sut.post({ url: URL_BASE });

    expect(mockedAxios).toHaveBeenCalledWith(URL_BASE);
  });
  
});
