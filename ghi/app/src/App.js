import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListManufacturers from './manufacturers';
import AddManufacturer from './manufacturer/new';
import ListModels from './models';
import AddModel from './model/new';
import ListAutomobiles from './automobiles';
import AddAutomobile from './automobile/new';
import ListTechnicians from './technicians';
import AddTechnician from './technician/new';
import ListServiceAppointments from './serviceappointments';
import AddServiceAppointment from './serviceappointment/new';
import ServiceAppointmentsHistory from './serviceappointment/history';
import ListSalespeople from './salespeople';
import AddSalesperson from './salesperson/new';
import SalespersonHistory from './salesperson/history';
import ListCustomers from './customers';
import AddCustomer from './customer/new';
import ListSales from './sales';
import AddSale from './sale/new';


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
