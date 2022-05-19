import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavigationBar } from './Components/Navbar';
import Background from './Components/Background';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Background/>
    </div>
  );
}

export default App;
