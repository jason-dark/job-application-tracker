import axios, { AxiosInstance } from 'axios';

export class AxiosClient {
  private static instance: AxiosClient | null;
  public client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  public static getInstance(): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient();
    }

    return AxiosClient.instance;
  }

  public static resetInstance(): void {
    AxiosClient.instance = null;
  }

  public set token(token: string | null) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      this.client.defaults.headers.common['Authorization'] = null;
    }
  }
}
