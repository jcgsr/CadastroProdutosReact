// 05.06.2020

import React from 'react';

import Navbar from './components/navbar';
import Rotas from './rotas';
import { HashRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Rotas />
      </HashRouter>
    </>

  );
}

export default App;
