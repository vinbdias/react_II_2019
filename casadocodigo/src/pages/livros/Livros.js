import React, { Fragment, Component } from 'react';
import Header from '../../components/header/Header';
import DataTable from '../../components/datatable/DataTable';
import ApiService from '../../utils/ApiService';
import PopUp from '../../utils/PopUp';


class Livros extends Component {

    constructor(props) {

        super(props);

        this.state = {
            title: 'Livros',
            livros: []
        };
    }

    async componentDidMount() {

        try {

            const livros = await ApiService.ListLivros();

            this.setState({ livros: [...this.state.livros, ...livros] });            
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
                    <h1>Página de Livros</h1>
                    <DataTable data={this.state.livros} title={this.state.title} columns={['livro']} />
                </div>
            </Fragment>            
        );
    }
}

export default Livros;