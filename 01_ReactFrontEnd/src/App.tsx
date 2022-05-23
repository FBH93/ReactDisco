import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavigationBar } from './Components/Navbar';
import { Basket } from './Components/Basket';
import Background from './Components/Background';
import ProductGrid from './Components/ProductGrid';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { Product } from './Components/Product';
import { render } from 'react-dom';
import {Account} from './Components/Account';
import { Greetings } from './Components/Atoms/Greetings';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Greetings/>
          <Routes>
              <Route path="/" element={<ProductGrid filter1={'None'} filter2={'None'}/>}/>
              <Route path="/products/70s" element={<ProductGrid filter1={'style=70s'} filter2={'None'}/>} />
              <Route path="/products/80s" element={<ProductGrid filter1={'style=80s'} filter2={'None'}/>} />
              <Route path="/products/sportswear" element={<ProductGrid filter1={'style=sportswear'} filter2={'None'}/>} />
              <Route path="/products/space" element={<ProductGrid filter1={'style=space'} filter2={'None'}/>} />
              <Route path="/:id" element ={<Product />}/>
              <Route path="/account" element = {<Account />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
