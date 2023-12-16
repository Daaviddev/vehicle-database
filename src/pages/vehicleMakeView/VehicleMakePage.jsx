import React from 'react';
import CreateButton from '../../components/reusable/CreateButton';
import showMessagePopup from '../../utils/messagePopupUtils';

const VehicleMakePage = () => {
  const handleCreateButtonClick = () => {
    showMessagePopup('Test', 'error');
  };

  return (
    <div className="page-canvas">
      <div className="view-header-div">
        <h2>Vehicle Make View</h2>
        <CreateButton onClick={handleCreateButtonClick} />
      </div>
      <div className="components-wrapper">
        <h3>TODO: implement</h3>
      </div>
    </div>
  );
};

export default VehicleMakePage;
