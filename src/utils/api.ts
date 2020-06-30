import axios from 'axios';

class ApiWrapper {
  API_BASE_URL = 'http://127.0.0.1:8000/api/';

  ENDPOINTS = {
    getItems: 'items',
    createItem: 'items/',
    scales: 'scales',
    tokenAuth: 'token-auth',
  };

  instance: ReturnType<typeof axios.create>;

  private static getTokenFromStorage() {
    return localStorage.getItem('token');
  }

  private static putTokenInStorage(token: string) {
    localStorage.setItem('token', token);
  }

  private static removeTokenFromStorage() {
    localStorage.removeItem('token');
  }

  setTokenAuth(token: string) {
    this.instance.defaults.headers.common.Authorization = `JWT ${token}`;
  }

  removeTokenAuth() {
    ApiWrapper.removeTokenFromStorage();
    this.instance.defaults.headers.common.Authorization = undefined;
  }

  isAuthenticated(): boolean {
    const token = ApiWrapper.getTokenFromStorage();
    if (token !== null) {
      this.setTokenAuth(token);
      return true;
    }
    return false;
  }

  constructor() {
    this.instance = axios.create({
      baseURL: this.API_BASE_URL,
    });
    this.isAuthenticated();
  }

  async login(payload: { username: string; password: string }) {
    const response = await this.instance.post(
      this.ENDPOINTS.tokenAuth,
      payload,
    );
    const { token } = response.data;
    ApiWrapper.putTokenInStorage(token);
    this.setTokenAuth(token);
  }

  async fetchScales() {
    const response = await this.instance.get(this.ENDPOINTS.scales);
    return response.data;
  }

  async fetchItems() {
    const response = await this.instance.get(this.ENDPOINTS.getItems);
    return response.data;
  }

  async createItem(payload: {
    name: string;
    description: string;
    scales: number[];
  }) {
    const response = await this.instance.post(
      this.ENDPOINTS.createItem,
      payload,
    );
    return response.data;
  }
}

const apiInstance = new ApiWrapper();
export default apiInstance;
