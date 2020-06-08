import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './views/home';
import CadastroProdutos from './views/produtos/cadastro';
import ConsultaProdutos from './views/produtos/consulta';

export default () => {
   return (

      <Switch>
         <Route exact path="/cadastro-produtos" component={CadastroProdutos}></Route>
         <Route exact path="/consulta-produtos" component={ConsultaProdutos}></Route>
         <Route exact path="/" component={Home}></Route>
      </Switch>

   )
}