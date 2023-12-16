// Disabling Eslint Rule for no-param-reassign
// Rule Throws error - Assignment to property of function parameter 'store'. eslint
// his is a pragmatic approach when the mutation aligns with the library's intended usage.

/* eslint-disable no-param-reassign */

import { runInAction } from 'mobx';

// Reset sorting parameters to default
export function resetSorting(store) {
  runInAction(() => {
    store.sortField = 'name';
    store.sortOrder = 'ASCENDING';
  });
}

// Update pagination details based on fetched data
export function updatePaginationState(store, fetchedData) {
  runInAction(() => {
    store.paginate.totalPages = fetchedData.totalPages;
    store.paginate.currentPage = fetchedData.currentPage;
    store.paginate.previousPageToken = fetchedData.previousPageToken;
    store.paginate.nextPageToken = fetchedData.nextPageToken;
  });
}

// Update pagination configuration based on UI interaction
export function updatePaginationConfig(store, paginationProps) {
  runInAction(() => {
    if (paginationProps.pageSize !== store.pagination.pageSize) {
      store.paginate.pageSize = paginationProps.pageSize;
      store.pagination.pageSize = paginationProps.pageSize;
      store.pagination.pageToken = '';
    }

    store.pagination.pageToken =
      store.paginate.currentPage > paginationProps.currentPage
        ? store.paginate.previousPageToken
        : store.paginate.nextPageToken;
  });
}
