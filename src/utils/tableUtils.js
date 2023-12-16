const generateColumnFieldsFromData = (data) => {
  // Check if data is not empty and is an array
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Define the mandatory Id column
  const idColumn = {
    Header: 'Id',
    field: 'id',
  };

  // Generate columns using 'label' for Header and 'name' for field
  const columns = data.map((item) => ({
    Header: item.label,
    field: item.name,
  }));

  // Prepend the Id column to the list of columns
  console.log([idColumn, ...columns]);
  return [idColumn, ...columns];
};

export default generateColumnFieldsFromData;
