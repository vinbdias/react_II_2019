import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';
import Header from '../../components/header/Header';
import Table from '../../components/table/Table';
import Form from '../../components/form/Form';
import PopUp from '../../utils/PopUp';
import ApiService from '../../utils/ApiService';

class Home extends Component {

    constructor(props) {

        super(props);

        this.state = {
            'autores': []
        };
    }

    removeAutor = async id => {

        try {

            const { autores } = this.state;

            await ApiService.RemoveAutor(id);

            this.setState({
                autores: autores.filter((autor) => autor.id !== id),
            });            

            PopUp.showMessage('error', 'Autor removido com sucesso');            
        }
        catch(error) {

            PopUp.showMessage('error', error);
        }                
    };

    handleSubmit = async autor => {

        try {

            await ApiService.Add(autor);

            this.setState({ autores: [...this.state.autores, autor] });

            PopUp.showMessage('success', 'Autor adicionado com sucesso');            
        }
        catch(error) {

            PopUp.showMessage('error', error);
        }
    };

    async componentDidMount() {

        try {

            const autores = await ApiService.List();

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
                <div className="container mb-10">
                    <Table autores={this.state.autores} removeAutor={this.removeAutor} />
                    <Form handleSubmit={this.handleSubmit} />
                </div>
            </Fragment>
        );
    }
}

export default Home;
