import React, { Component } from 'react';
import FormValidator from './FormValidator';
import PopUp from './PopUp';

class Formulario extends Component {

    constructor(props) {

        super(props);

        this.formValidator = new FormValidator([
            {
                field: 'nome',
                method: 'isEmpty',
                validWhen: false,
                message: 'Enre com um nome'
            },
            {
                field: 'livro',
                method: 'isEmpty',
                validWhen: false,
                message: 'Entre com um livro'
            },
            {
                field: 'preco',
                method: 'isInt',
                args: [{ min: 0, max: 99999 }],
                validWhen: true,
                message: 'Entre com um valor numérico'
            }
        ]);

        this.initialState = {
            nome: '',
            livro: '',
            preco: '',
            validation: this.formValidator.valid()
        };

        this.state = this.initialState;
    }

    handleChange = event => {

        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    submit = () => {

        const validation = this.formValidator.validate(this.state);

        if (validation.isValid) {

            this.props.handleSubmit(this.state);
            this.setState(this.initialState);
        }
        else {

            const { nome, livro, preco } = validation;
            const fields = [ nome, livro, preco ];

            const invalidFields = fields.filter(elem => elem.isInvalid);

            invalidFields.forEach(field =>
                PopUp.showMessage('error', field.message));
        }
    };

    render() {

        const { nome, livro, preco } = this.state;

        return (
            <form>
                <div className="row">
                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="nome">Nome</label>
                        <input
                            className="validate"
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={this.handleChange}
                        />                        
                    </div>

                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="livro">Livro</label>
                        <input
                            className="validate"
                            id="livro"
                            type="text"
                            name="livro"
                            value={livro}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="preco">Preço</label>
                        <input
                            className="validate"
                            id="preco"
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <button type="button" onClick={this.submit} className="waves-effect waves-light indigo lighten-2 btn">Salvar</button>
            </form>
        );
    }
}

export default Formulario;