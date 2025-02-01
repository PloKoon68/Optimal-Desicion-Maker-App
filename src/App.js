import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  // Optional but recommended

import { Routes, Route } from 'react-router-dom';

import Navbar from "./Navbar.js"
import ProcessingPage from "./Processing Page/ProcessingPage.js";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/*
          <Route path="/my-cases" element={<MyCases />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        */}
      </Routes>
      <ProcessingPage/>     

      

    </div>
  );
}

export default App;
