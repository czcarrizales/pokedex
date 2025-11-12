import { useState } from 'react'
import './App.css'
import PokedexList from './PokedexList'
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tracker from './Tracker';

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={ <Tracker />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
