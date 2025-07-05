import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import FlightResults from './pages/FlightResults';
import HotelResults from './pages/HotelResults';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-gray-800">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/flight-results" element={<FlightResults />} />
            <Route path="/hotel-results" element={<HotelResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;