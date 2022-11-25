import {React, useState} from 'react';
import './style/App.css';
import MyNavBar from './components/UI/NavBar/MyNavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import MyModal from "./components/UI/Modal/MyModal";

function App() {
  return (
    <div className="App">
      <Router>
        <MyNavBar/>
        <AppRouter/>
      </Router>
    </div>
  );
}

export default App;
