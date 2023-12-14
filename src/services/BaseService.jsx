import axios from 'axios';
import firebaseConfig from '../constants/firebaseConfig';

class BaseService {
  constructor(resource) {
    this.resource = resource;
    this.baseUrl = `${firebaseConfig.databaseURL}/${resource}`;
  }

  async create(data) {
    try {
      const response = await axios.post(this.baseUrl, data);
      return response.data;
    } catch (error) {
      console.error('Error during create: ', error);
    }
  }

  async read() {
    try {
      const url = `${this.baseUrl}?sort=name&order=asc`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error during read: ', error);
    }
  }

  async readWithParams(data) {
    try {
      const url = `${this.baseUrl}/query`;
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error during read: ', error);
    }
  }

  async update(id, data) {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await axios.patch(url, data);
      return response.data;
    } catch (error) {
      console.error('Error during update: ', error);
    }
  }

  async delete(id) {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Error during delete: ', error);
    }
  }
}

export default BaseService;
