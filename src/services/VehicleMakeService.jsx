import BaseService from './BaseService';
import { createQuery } from '../utils/queryUtil';

class VehicleMakeService extends BaseService {
  constructor() {
    super('vehicleMake'); // Endpoint URL
  }

  async fetchMakes() {
    return await this.read();
  }

  async fetchMakesWithParams(data) {
    return await this.readWithParams(createQuery(data));
  }

  async addVehicleMake(data) {
    return await this.create(data);
  }

  async updateVehicleMake(id, data) {
    return await this.update(id, data);
  }

  async deleteVehicleMake(id) {
    return await this.delete(id);
  }
}

export default new VehicleMakeService();
