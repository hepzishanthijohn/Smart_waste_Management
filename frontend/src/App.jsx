import { useState } from 'react';
import SplashPage from './components/splash/SplashPage';
import './App.css';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home/HomePage';
import IntroPage from './components/splash/IntroPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/signup/login/Login';
import Register from './pages/signup/register/Register';
import WasteStatus from './components/wasteStatus/WasteStatus';  
import { WasteProvider } from './context/WasteContext'; 

function App() {
  return (
    <WasteProvider>
      <BrowserRouter>
        <Navbar /> {/* You can choose to include the Navbar if necessary */}
        <Routes>
          <Route path='/' element={<IntroPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<HomePage />} />
          {/* Adding route for WasteStatus */}
          <Route path='/waste-status' element={<WasteStatus />} />
        </Routes>
      </BrowserRouter>
    </WasteProvider>
  );
}

export default App;
