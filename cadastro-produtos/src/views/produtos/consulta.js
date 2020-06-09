import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ProdutoService from '../../app/produtoService';

class ConsultaProdutos extends Component {

   state = {
      produtos: []
   }

   constructor() {
      super();
      this.service = new ProdutoService();
   }

   componentDidMount() {
      const produtos = this.service.obterProdutos();
      this.setState({ produtos })
   }

   preparaEditar = (sku) => {
      this.props.history.push(`/cadastro-produtos/${sku}`)
   }

   deletar = (sku) => {
      const produtos = this.service.deletar(sku)
      this.setState({produtos})
   }

   render() {
      return (

         <div className="card">
            <div className="card-header">
               Consulta de Produtos
            </div>
            <div className="card-body">
               <table className="table table-hover">
                  <thead>
                     <tr>
                        <th>Nome</th>
                        <th>SKU</th>
                        <th>Preço</th>
                        <th>Fornecedor</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {this.state.produtos.map((produto, index) => {
                        return (
                           <tr key={index}>
                              <th>{produto.nome}</th>
                              <th>{produto.sku}</th>
                              <th>{produto.preco}</th>
                              <th>{produto.fornecedor}</th>
                              <th>
                                 <button onClick={() => this.preparaEditar(produto.sku)} className="btn btn-primary">Editar</button>
                                 <button onClick={() => this.deletar(produto.sku)} className="btn btn-danger">Remover</button>
                              </th>
                           </tr>
                        )
                     })
                     }
                  </tbody>
               </table>
            </div>
         </div>
      );
   }
}

export default withRouter(ConsultaProdutos);