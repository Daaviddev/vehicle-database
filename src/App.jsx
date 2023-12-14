import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import MessagePopup from './components/ui/MessagePopup';
import VehicleMakePage from './pages/vehicleMakeView/VehicleMakePage';

import './styles/App.css';

function App() {
  const handlePopupClose = () => {
    console.log('close');
  };

  return (
    <div className="app">
      <MessagePopup message={'test'} onClose={handlePopupClose} />
      <div className="main-content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<VehicleMakePage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
