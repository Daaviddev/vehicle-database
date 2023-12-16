// Function to create a query object for Firestore
function createQuery(data) {
  return {
    pageSize: data.pagination.pageSize,
    pageToken: data.pagination.pageToken,
    structuredQuery: {
      where: {
        fieldFilter: {
          field: {
            fieldPath: data.filters.field,
          },
          op: data.filters.operator,
          value: {
            stringValue: data.filters.value,
          },
        },
      },
      orderBy: [
        {
          field: {
            fieldPath: data.sortField,
          },
          direction: data.sortOrder,
        },
      ],
    },
  };
}

export default createQuery;
