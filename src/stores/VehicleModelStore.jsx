import { makeObservable, observable, action, runInAction } from 'mobx';
import VehicleModelService from '../services/VehicleModelService';
import { showMessagePopup } from '../utils/messagePopupUtils';

class VehicleModelStore {
  models = [];
  sortField = 'name'; // default sort field
  sortOrder = 'ASCENDING'; // default sort order
  filters = {
    field: 'name',
    operator: 'STARTS_WITH',
    value: '',
  };

  paginate = {
    currentPage: 1,
    pageSize: 3,
    totalPages: 1,
    previousPageToken: '',
    nextPageToken: '',
    filteredResults: 0,
  };

  pagination = {
    pageSize: 3,
    pageToken: '',
  };

  constructor() {
    makeObservable(this, {
      models: observable,
      sortField: observable,
      sortOrder: observable,
      filters: observable,
      paginate: observable,
      addVehicleModel: action,
      deleteVehicleModel: action,
      updateVehicleModel: action,
      fetchModels: action,
      sortModels: action,
      filterModels: action,
      paginationChange: action,
    });
  }

  async fetchModels() {
    try {
      const fetchedData = await VehicleModelService.fetchModelsWithParams({
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        filters: this.filters,
        pagination: this.pagination,
      });
      const fetchedModels = fetchedData.documents;
      runInAction(() => {
        this.models = fetchedModels.map((model) => ({
          ...model,
          name: model.nameDisplay,
          make: model.makeDisplay,
        }));
        if (fetchedData.totalPages > 1) {
          this.paginate.totalPages = fetchedData.totalPages;
          this.paginate.currentPage = fetchedData.currentPage;
          this.paginate.previousPageToken = fetchedData.previousPageToken;
          this.paginate.nextPageToken = fetchedData.nextPageToken;
        }
      });
    } catch (error) {
      showMessagePopup(`Error during fetchModel: ${error.message}`, 'error');
    }
  }

  async addVehicleModel(data) {
    try {
      const response = await VehicleModelService.addVehicleModel(data);
      this.fetchModels();
      return response;
    } catch (error) {
      showMessagePopup('Error during addVehicleModel: ', error);
    }
  }

  async updateVehicleModel(id, data) {
    try {
      const response = await VehicleModelService.updateVehicleModel(id, data);
      this.fetchModels();
      return response;
    } catch (error) {
      showMessagePopup(
        `Error during updateVehicleModel: ${error.message}`,
        'error'
      );
    }
  }

  async deleteVehicleModel(id) {
    try {
      const response = await VehicleModelService.deleteVehicleModel(id);
      this.fetchModels();
      return response;
    } catch (error) {
      showMessagePopup(
        `Error during deleteVehicleModel: ${error.message}`,
        'error'
      );
    }
  }

  async paginationChange(paginationProps) {
    if (paginationProps.pageSize !== this.pagination.pageSize) {
      this.paginate.pageSize = paginationProps.pageSize;
      this.pagination.pageSize = paginationProps.pageSize;
      this.pagination.pageToken = '';
    }

    if (this.paginate.currentPage > paginationProps.currentPage) {
      this.pagination.pageToken = this.paginate.previousPageToken;
    } else if (this.paginate.currentPage < paginationProps.currentPage) {
      this.pagination.pageToken = this.paginate.nextPageToken;
    }

    await this.fetchModels();
  }

  async sortModels(field) {
    this.sortField = field;
    this.sortOrder =
      this.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING';
    await this.fetchModels();
  }

  async filterModels(filter) {
    this.filters = filter;
    this.sortField = 'name';
    this.sortOrder = 'ASCENDING';
    await this.fetchModels();
  }
}

export default new VehicleModelStore();
