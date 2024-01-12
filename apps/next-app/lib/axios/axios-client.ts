import axios from 'axios';

export class AxiosClient {
  axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  // constructor() {
  // super();
  // this.client.auth.onAuthStateChange((_, session) => {
  //   if (session) {
  //     console.log('setting bearer token', session.access_token);
  //     this.axiosClient.defaults.headers.common[
  //       'Authorization'
  //     ] = `Bearer ${session.access_token}`;
  //   } else {
  //     this.axiosClient.defaults.headers.common['Authorization'] = null;
  //   }
  // });
  // }
}
