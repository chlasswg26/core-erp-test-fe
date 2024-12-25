import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router"
import AddVehiclePage from './pages/AddVehicle.jsx'
import EditVehicleDetailPage from './pages/EditVehicle.jsx'
import VehicleDetailPage from './pages/DetailVehicle.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <Routes>
        <Route index element={<App />} />
        <Route path="add" element={<AddVehiclePage />} />
        <Route path="detail">
          <Route index element={<VehicleDetailPage />} />
          <Route path=":pid" element={<VehicleDetailPage />} />
        </Route>
        <Route path="edit">
          <Route index element={<EditVehicleDetailPage />} />
          <Route path=":pid" element={<EditVehicleDetailPage />} />
        </Route>
      </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
