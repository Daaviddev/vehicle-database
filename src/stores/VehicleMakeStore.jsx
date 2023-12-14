// src/stores/VehicleMakeStore.js
import { makeObservable, observable, action, runInAction } from 'mobx';
import VehicleMakeService from '../services/VehicleMakeService';
import { showMessagePopup } from '../utils/messagePopupUtils';

class VehicleMakeStore {
  makes = [];
  sortField = 'name'; // default sort field for vehicle makes
  sortOrder = 'ASCENDING'; // default sort order
  filters = {
    field: 'name', // default filter field
    operator: 'STARTS_WITH', // filter operator
    value: '', // filter value, initially empty
  };

  makeNames = []; // array to store vehicle make names

  // Pagination configuration
  paginate = {
    currentPage: 1,
    pageSize: 3, // number of items per page
    totalPages: 1, // total number of pages
    previousPageToken: '', // token for the previous page
    nextPageToken: '', // token for the next page
    filteredResults: 0, // number of filtered results
  };

  pagination = {
    pageSize: 3, // initial page size
    pageToken: '', // token for pagination
  };

  constructor() {
    // Observables and actions for MobX state management
    makeObservable(this, {
      makes: observable,
      sortField: observable,
      makeNames: observable,
      sortOrder: observable,
      filters: observable,
      paginate: observable,
      addVehicleMake: action,
      deleteVehicleMake: action,
      updateVehicleMake: action,
      fetchMakes: action,
      sortMakes: action,
      filterMakes: action,
      paginationChange: action,
      getMakeNames: action,
    });
  }

  // Fetches vehicle makes with specified parameters
  async fetchMakes() {
    try {
      const fetchedData = await VehicleMakeService.fetchMakesWithParams({
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        filters: this.filters,
        pagination: this.pagination,
      });
      const fetchedMakes = fetchedData.documents;

      // Update store state in a MobX action
      runInAction(() => {
        this.makes = fetchedMakes.map((make) => ({
          ...make,
          name: make.nameDisplay, // using nameDisplay for make name
        }));
        // Update pagination details if applicable
        if (fetchedData.totalPages > 1) {
          this.paginate.totalPages = fetchedData.totalPages;
          this.paginate.currentPage = fetchedData.currentPage;
          this.paginate.previousPageToken = fetchedData.previousPageToken;
          this.paginate.nextPageToken = fetchedData.nextPageToken;
        }
      });
    } catch (error) {
      showMessagePopup(`Error during fetchMakes: ${error.message}`, 'error');
    }
  }

  // Retrieves names of all vehicle makes
  async getMakeNames() {
    try {
      const fetchedMakes = await VehicleMakeService.fetchMakes();
      runInAction(() => {
        this.makeNames = fetchedMakes.map((make) => make.nameDisplay);
      });
    } catch (error) {
      showMessagePopup(`Error during getMakeNames: ${error.message}`, 'error');
    }
  }

  // Adds a new vehicle make
  async addVehicleMake(data) {
    try {
      const response = await VehicleMakeService.addVehicleMake(data);
      this.fetchMakes();
      return response;
    } catch (error) {
      console.error('Error during addVehicleMake: ', error);
    }
  }

  // Updates an existing vehicle make
  async updateVehicleMake(id, data) {
    try {
      const response = await VehicleMakeService.updateVehicleMake(id, data);
      this.fetchMakes();
      return response;
    } catch (error) {
      showMessagePopup(
        `Error during updateVehicleMake: ${error.message}`,
        'error'
      );
    }
  }

  // Deletes a vehicle make
  async deleteVehicleMake(id) {
    try {
      const response = await VehicleMakeService.deleteVehicleMake(id);
      this.fetchMakes();
      return response;
    } catch (error) {
      showMessagePopup(
        `Error during deleteVehicleMake: ${error.message}`,
        'error'
      );
    }
  }

  // Handles pagination changes
  async paginationChange(paginationProps) {
    // Update page size and reset page token if page size changes
    if (paginationProps.pageSize !== this.pagination.pageSize) {
      this.paginate.pageSize = paginationProps.pageSize;
      this.pagination.pageSize = paginationProps.pageSize;
      this.pagination.pageToken = '';
    }

    // Update page token based on current page
    if (this.paginate.currentPage > paginationProps.currentPage) {
      this.pagination.pageToken = this.paginate.previousPageToken;
    } else if (this.paginate.currentPage < paginationProps.currentPage) {
      this.pagination.pageToken = this.paginate.nextPageToken;
    }

    await this.fetchMakes();
  }

  // Handles sorting of vehicle makes
  async sortMakes(field) {
    this.sortField = field;
    // Toggle sort order between ascending and descending
    this.sortOrder =
      this.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING';
    await this.fetchMakes();
  }

  // Applies filters to the vehicle makes
  async filterMakes(filter) {
    this.filters = filter;
    this.sortField = 'name'; // Reset sort field on filtering
    this.sortOrder = 'ASCENDING'; // Reset sort order on filtering
    await this.fetchMakes();
  }
}

export default new VehicleMakeStore();
