import axios from 'axios';

class ApiWrapper {
  API_BASE_URL = 'http://127.0.0.1:8000/api';

  instance: ReturnType<typeof axios.create>;

  setTokenAuth(token: string) {
    localStorage.setItem('token', token);
    this.instance.defaults.headers.common.Authorization = `JWT ${token}`;
  }

  removeTokenAuth() {
    localStorage.removeItem('token');
    this.instance.defaults.headers.common.Authorization = undefined;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
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
  }

  async login(payload: { username: string; password: string }) {
    const response = await this.instance.post('/token-auth', payload);
    const { token } = response.data;
    this.setTokenAuth(token);
  }

  async fetchScales() {
    const response = await this.instance.get('/scales');
    return response.data;
  }

  async fetchItems() {
    const response = await this.instance.get('/items');
    return response.data;
  }
}

const apiInstance = new ApiWrapper();
export default apiInstance;
