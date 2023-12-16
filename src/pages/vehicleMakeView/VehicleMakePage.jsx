import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import VehicleMakeStore from '../../stores/VehicleMakeStore';
import CreateButton from '../../components/reusable/CreateButton';
import Table from '../../components/ui/Table';

import showMessagePopup from '../../utils/messagePopupUtils';
import generateColumnFieldsFromData from '../../utils/tableUtils';
import VehicleMakeConst from '../../constants/vehicleMakeConst';

const VehicleMakePage = observer(() => {
  useEffect(() => {
    VehicleMakeStore.fetchMakes();
  }, []);

  const navigate = useNavigate();

  // Generate columns based on VehicleMake class properties
  const columns = generateColumnFieldsFromData(VehicleMakeConst);

  const handleCreateNew = () => {
    showMessagePopup('Create new vehicle make', 'success');
    navigate('/vehicle-makes/create');
  };

  const handleEdit = (id) => {
    navigate(`/vehicle-makes/edit/${id}`);
  };

  const handleDelete = (id) => {
    VehicleMakeStore.deleteVehicleMake(id);
  };

  const handleSort = (field) => {
    console.log('sort-field: ', field);
    VehicleMakeStore.sortMakes(field);
  };

  return (
    <div className="page-canvas">
      <div className="view-header-div">
        <h2>Vehicle Make View</h2>
        <CreateButton onClick={handleCreateNew} />
      </div>
      <div className="components-wrapper">
        <Table
          columns={columns}
          data={VehicleMakeStore.makes}
          pageSize={VehicleMakeStore.paginate.pageSize}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={handleSort}
        />
      </div>
    </div>
  );
});

export default VehicleMakePage;
