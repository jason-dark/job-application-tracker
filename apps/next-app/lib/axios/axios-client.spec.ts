import { AxiosClient } from './axios-client';

describe('AxiosClient', () => {
  let axiosClient: AxiosClient;

  beforeEach(() => {
    axiosClient = AxiosClient.getInstance();
  });

  afterEach(() => {
    AxiosClient.resetInstance();
  });

  it('should create a singleton instance of AxiosClient', () => {
    const instance1 = AxiosClient.getInstance();
    const instance2 = AxiosClient.getInstance();

    expect(instance1).toBe(instance2);
  });

  it('should initialize the Axios instance with the base URL', () => {
    // This env var is is in setup-tests.js
    expect(axiosClient.client.defaults.baseURL).toBe('test_url');
  });

  it('should set the bearer token for authentication', () => {
    const token = 'YOUR_TOKEN';
    axiosClient.token = token;

    expect(axiosClient.client.defaults.headers.common['Authorization']).toBe(`Bearer ${token}`);
  });

  it('should remove the bearer token for authentication', () => {
    const token = 'YOUR_TOKEN';
    axiosClient.token = token;

    axiosClient.token = null;

    expect(axiosClient.client.defaults.headers.common['Authorization']).toBeUndefined();
  });
});
