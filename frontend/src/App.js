import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import MyLocations from './pages/mylocations';
import ContactUs from './pages/contactus';
import Login from './pages/login';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/mylocations" element={<MyLocations />} />  
          <Route path="/Login" element={<Login/>} />
          <Route path="*" element={<ContactUs />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
