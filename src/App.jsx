import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import messagePopupStore from './stores/MessagePopupStore';
import MessagePopup from './components/ui/MessagePopup';
import SidePanelNav from './components/ui/SidePanelNav';

import './styles/App.css';

// Lazy load the pages
const VehicleMakePage = lazy(
  () => import('./pages/vehicleMakeView/VehicleMakePage')
);
const VehicleMakeForm = lazy(
  () => import('./pages/vehicleMakeView/VehicleMakeForm')
);
const VehicleModelPage = lazy(
  () => import('./pages/vehicleModelView/VehicleModelPage')
);
const VehicleModelForm = lazy(
  () => import('./pages/vehicleModelView/VehicleModelForm')
);

const App = observer(() => (
  <div className="app">
    <SidePanelNav />
    <div className="main-content">
      <MessagePopup messagePopupStore={messagePopupStore} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<VehicleMakePage />} />
          <Route path="/vehicle-makes" element={<VehicleMakePage />} />
          <Route path="/vehicle-makes/create" element={<VehicleMakeForm />} />
          <Route path="/vehicle-makes/edit/:id" element={<VehicleMakeForm />} />
          <Route path="/vehicle-models" element={<VehicleModelPage />} />
          <Route path="/vehicle-models/create" element={<VehicleModelForm />} />
          <Route
            path="/vehicle-models/edit/:id"
            element={<VehicleModelForm />}
          />
        </Routes>
      </Suspense>
    </div>
  </div>
));

export default App;
