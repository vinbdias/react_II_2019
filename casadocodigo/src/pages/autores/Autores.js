import React, { Component, Fragment } from 'react';
import Header from '../../components/header/Header';
import DataTable from '../../components/datatable/DataTable';
import ApiService from '../../utils/ApiService';
import PopUp from '../../utils/PopUp';


class Autores extends Component {

    constructor(props) {

        super(props);

        this.state = {
            title: 'Autores',
            autores: []
        };
    }

    async componentDidMount() {

        try {

            const autores = await ApiService.ListNomes();

            this.setState({ autores: [...this.state.autores, ...autores] });            
        }
        catch(error) {
            
            PopUp.showMessage('error', error);     
        }
    }    

    render() {

        return (
            <Fragment>
                <Header />
                <div className="container">
                    <h1>Página de Autores</h1>
                    <DataTable data={this.state.autores} title={this.state.title} columns={['nome']} />
                </div>
            </Fragment>
        );                
    }
}

export default Autores;