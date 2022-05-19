import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavigationBar } from './Components/Navbar';
import Background from './Components/Background';
import ProductGrid from './Components/ProductGrid';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <ProductGrid filter={''} type={'None'}/> 
    </div>
  );
}

export default App;

//Code holding area:
/*
<Background/>


*/