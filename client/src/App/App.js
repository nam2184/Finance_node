
import './App.css';
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import Stockmarket from "../Stockmarket/Stockmarket";
import Prediction from "../Prediction/Prediction";
import Searchbar from "../Stockmarket/Searchbar"
import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  

  return (
    <Router>
      <div className='App'>
        <Navbar/>
        <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route path='/stock/:symbol' element={<Stockmarket/>}/> 
            <Route exact path='/prediction' element={<Prediction/>}> </Route>
        </Routes>
      </div>
    </Router>);
}

export default App;
