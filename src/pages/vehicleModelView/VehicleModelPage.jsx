import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import VehicleModelStore from '../../stores/VehicleModelStore';
import CreateButton from '../../components/reusable/CreateButton';
import Table from '../../components/ui/Table';

import generateColumnFieldsFromData from '../../utils/tableUtils';
import VehicleModelConst from '../../constants/vehicleModelConst';

const VehicleModelPage = observer(() => {
  useEffect(() => {
    VehicleModelStore.fetchModels();
  }, []);

  const navigate = useNavigate();

  // Generate columns based on VehicleModel class properties
  const columns = generateColumnFieldsFromData(VehicleModelConst);

  const handleCreateNew = () => {
    navigate('/vehicle-models/create');
  };

  const handleEdit = (id) => {
    navigate(`/vehicle-models/edit/${id}`);
  };

  const handleDelete = (id) => {
    VehicleModelStore.deleteVehicleModel(id);
  };

  const handleSort = (field) => {
    console.log('sort-field: ', field);
    VehicleModelStore.sortModels(field);
  };
  return (
    <div className="page-canvas">
      <div className="view-header-div">
        <h2>Vehicle Models</h2>
        <CreateButton onClick={handleCreateNew} />
      </div>
      <div className="components-wrapper">
        <Table
          columns={columns}
          data={VehicleModelStore.models}
          pageSize={VehicleModelStore.paginate.pageSize}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={handleSort}
        />
      </div>
    </div>
  );
});

export default VehicleModelPage;
