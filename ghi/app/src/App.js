import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListManufacturers from './ListManufacturers';
import AddManufacturer from './AddManufacturer';
import ListModels from './ListModels';
import AddModel from './AddModel';
import ListAutomobiles from './ListAutomobiles';
import AddAutomobile from './AddAutomobile';
import ListTechnicians from './ListTechnicians';
import AddTechnician from './AddTechnician';
import ListServiceAppointments from './ListServiceAppointments';
import AddServiceAppointment from './AddServiceAppointment';
import ServiceAppointmentsHistory from './ServiceAppointmentsHistory';
import ListSalespeople from './ListSalespeople';
import AddSalesperson from './AddSalesperson';
import SalespersonHistory from './SalespersonHistory';
import ListCustomers from './ListCustomers';
import AddCustomer from './AddCustomer';
import ListSales from './ListSales';
import AddSale from './AddSale';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ListManufacturers />} />
          <Route path="/manufacturer/new" element={<AddManufacturer />} />
          <Route path="/models" element={<ListModels />} />
          <Route path="/model/new" element={<AddModel />} />
          <Route path="/automobiles" element={<ListAutomobiles />} />
          <Route path="/automobile/new" element={<AddAutomobile />} />
          <Route path="/technicians" element={<ListTechnicians />} />
          <Route path="/technician/new" element={<AddTechnician />} />
          <Route path="/serviceappointments" element={<ListServiceAppointments />} />
          <Route path="/serviceappointment/new" element={<AddServiceAppointment />} />
          <Route path="/serviceappointments/history" element={<ServiceAppointmentsHistory />} />
          <Route path="/salespeople" element={<ListSalespeople />} />
          <Route path="/salesperson/new" element={<AddSalesperson />} />
          <Route path="/salesperson/history" element={<SalespersonHistory />} />
          <Route path="/customers" element={<ListCustomers />} />
          <Route path="/customer/new" element={<AddCustomer />} />
          <Route path="/sales" element={<ListSales />} />
          <Route path="/sale/new" element={<AddSale />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
