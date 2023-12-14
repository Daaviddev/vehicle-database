import BaseService from './BaseService';
import { createQuery } from '../utils';

class VehicleModelService extends BaseService {
  constructor() {
    super('vehicleModel'); // Endpoint URL
  }

  async fetchModels() {
    const rawData = await this.read();
    return rawData;
  }

  async fetchModelsWithParams(data) {
    const query = createQuery(data);
    const rawData = await this.readWithParams(query);
    return rawData;
  }

  async addVehicleModel(data) {
    const response = await this.create(data);
    return response;
  }

  async updateVehicleModel(id, data) {
    const response = await this.update(id, data);
    return response;
  }

  async deleteVehicleModel(id) {
    const response = await this.delete(id);
    return response;
  }
}

export default new VehicleModelService();
