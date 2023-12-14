import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import messagePopupStore from './stores/MessagePopupStore';
import MessagePopup from './components/ui/MessagePopup';

const VehicleMakePage = lazy(
  () => import('./pages/vehicleMakeView/VehicleMakePage')
);

import './styles/App.css';

const App = observer(() => {
  return (
    <div className="app">
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
  );
});

export default App;
