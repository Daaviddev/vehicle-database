import axios from 'axios';

import firebaseConfig from '../constants/firebaseConfig';
import { showMessagePopup } from '../utils/messagePopupUtils';

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
      showMessagePopup(`Error while creating data: ${error.message}`, 'error');
    }
  }

  async read() {
    try {
      const url = `${this.baseUrl}?sort=name&order=asc`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      showMessagePopup(`Error during fetching data: ${error.message}`, 'error');
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
      showMessagePopup(
        `Error during fetching data with parameters: ${error.message}`,
        'error'
      );
    }
  }

  async update(id, data) {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await axios.patch(url, data);
      return response.data;
    } catch (error) {
      showMessagePopup(`Error during update data: ${error.message}`, 'error');
    }
  }

  async delete(id) {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      showMessagePopup(`Error during delete data: ${error.message}`, 'error');
    }
  }
}

export default BaseService;
