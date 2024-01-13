import axios, { AxiosInstance } from 'axios';

/**
 * AxiosClient is a singleton class that provides an Axios instance with a base URL and bearer token authentication.
 */
export class AxiosClient {
  /**
   * The singleton instance of the AxiosClient class.
   */
  private static instance: AxiosClient | null;

  /**
   * The Axios instance used for making HTTP requests.
   */
  public client: AxiosInstance;

  /**
   * Private constructor to prevent direct instantiation of the class.
   * Initializes the Axios instance with the base URL.
   */
  private constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  /**
   * Returns the singleton instance of the AxiosClient class.
   * If the instance does not exist, it creates a new one.
   * @returns The singleton instance of the AxiosClient class.
   */
  public static getInstance(): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient();
    }

    return AxiosClient.instance;
  }

  /**
   * Resets the singleton instance of the AxiosClient class to null. Used for testing.
   */
  public static resetInstance(): void {
    AxiosClient.instance = null;
  }

  /**
   * Sets the token for authentication.
   * If a token is provided, it sets the 'Authorization' header with the token.
   * If no token is provided, it removes the 'Authorization' header.
   * @param token - The token for authentication.
   */
  public set token(token: string | null) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }
}
