import BaseService from './BaseService';
import { createQuery } from '../utils/queryUtil';

class VehicleModelService extends BaseService {
  constructor() {
    super('vehicleModel'); // Endpoint URL
  }

  async fetchModels() {
    return await this.read();
  }

  async fetchModelsWithParams(data) {
    return await this.readWithParams(createQuery(data));
  }

  async addVehicleModel(data) {
    return await this.create(data);
  }

  async updateVehicleModel(id, data) {
    return await this.update(id, data);
  }

  async deleteVehicleModel(id) {
    return await this.delete(id);
  }
}

export default new VehicleModelService();
