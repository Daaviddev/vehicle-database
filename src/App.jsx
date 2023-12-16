import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import messagePopupStore from './stores/MessagePopupStore';
import MessagePopup from './components/ui/MessagePopup';
import SidePanelNav from './components/ui/SidePanelNav';

import './styles/App.css';

const VehicleMakePage = lazy(
  () => import('./pages/vehicleMakeView/VehicleMakePage')
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
        </Routes>
      </Suspense>
    </div>
  </div>
));

export default App;
