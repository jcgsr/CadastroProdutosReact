import React, { Component } from 'react';

import Card from '../../components/card';
import ProdutoService from '../../app/produtoService';
import { withRouter } from 'react-router-dom';

const estadoInicial = {
   nome: '',
   sku: '',
   descricao: '',
   preco: 0,
   fornecedor: '',
   sucesso: false,
   errors: [],
   atualizando: false
}

class CadastroProdutos extends Component {
   constructor(props) {
      super(props);
      this.state = estadoInicial;
      this.service = new ProdutoService();
   }

   onChange = (e) => {
      const valor = e.target.value
      const nomeDoCampo = e.target.name
      this.setState({ [nomeDoCampo]: valor })
   }

   onSubmit = (e) => {
      const produto = {
         nome: this.state.nome,
         sku: this.state.sku,
         descricao: this.state.descricao,
         preco: this.state.preco,
         fornecedor: this.state.fornecedor
      }

      try {
         this.service.salvar(produto);
         this.limpar();
         this.setState({ sucesso: true })
      } catch (erro) {
         const errors = erro.errors;
         this.setState({ errors: errors })
      }

   }

   limpar = () => {
      this.setState(estadoInicial)
   }

   componentDidMount() {
      const sku = this.props.match.params.sku;

      if (sku) {
         const resultado = this.service.obterProdutos().filter(produto => produto.sku === sku)
         if (resultado.length === 1) {
            const produtoEncontrado = resultado[0]
            this.setState({ ...produtoEncontrado, atualizando: true })
         }
      }
   }

   render() {
      return (
         <Card header={this.state.atualizando ? 'Atualização de Produto' : 'Cadastro de Produto'}>

            {
               this.state.sucesso ?
                  (
                     <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Pronto!</strong> Cadastro feito com <a href="#" className="alert-link">sucesso</a>!
                     </div>
                  ) : (
                     <></>
                  )
            }

            {
               this.state.errors.length > 0 &&

               this.state.errors.map(msg => {
                  return (
                     <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Erro!</strong> {msg}
                     </div>
                  )
               })
            }

            <div className="row">
               <div className="col-md-6">
                  <div className="form-group">
                     <label>Nome: *</label>
                     <input
                        type="text"
                        name="nome"
                        onChange={this.onChange}
                        value={this.state.nome} c
                        lassName="form-control" />
                  </div>
               </div>

               <div className="col-md-6">
                  <div className="form-group">
                     <label>SKU: *</label>
                     <input
                        type="text"
                        name="sku"
                        disabled={this.state.atualizando}
                        onChange={this.onChange}
                        value={this.state.sku}
                        className="form-control" />
                  </div>
               </div>
            </div>

            <div className='row'>
               <div className="col-md-12">
                  <div className="form-group">
                     <label>Descrição:</label>
                     <textarea value={this.state.descricao} name="descricao" onChange={this.onChange} className="form-control"></textarea>
                  </div>
               </div>
            </div>

            <div className="row">
               <div className="col-md-6">
                  <div className="form-group">
                     <label>Preço: *</label>
                     <input
                        type="text"
                        name="preco"
                        onChange={this.onChange}
                        value={this.state.preco}
                        className="form-control" />
                  </div>
               </div>

               <div className="col-md-6">
                  <div className="form-group">
                     <label>Fornecedor: *</label>
                     <input
                        value={this.state.fornecedor}
                        name="fornecedor"
                        onChange={this.onChange}
                        type="text"
                        className="form-control" />
                  </div>
               </div>

            </div>

            <div className="row">
               <div className="col-md-1">
                  <button onClick={this.onSubmit} className="btn btn-success">
                     {this.state.atualizando ? 'Atualizar' : 'Salvar'}
                  </button>
               </div>
               <div className="col-md-1">
                  <button onClick={this.limpar} className="btn btn-primary">Limpar</button>
               </div>
            </div>


         </Card>
      )
   }
}

export default withRouter(CadastroProdutos);