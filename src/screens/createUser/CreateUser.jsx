import React from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import "./css/CreateUser.css"

import NavBar from '../../components/Navbar';
import GoBack from '../../components/GoBack';

export default class CreateUser extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        result: ''
    }

    create = async () => {
        console.log("Criando");
        await axios.post('http://localhost:8080/api/users',
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                }
            }
        ).then(response => {
            console.log(response);
        }
        ).catch(error => {
            console.log(error);
        }
        );
        console.log("Finalizado");
    }


    render() {
        return (
            <>
                <NavBar/>
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='bs-docs-section'>
                                <Card title='Cadastro de Usuario'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event=>{
                                                    event.preventDefault();
                                                    this.create()}
                                                    }>
                                                    <fieldset>
                                                        <FormGroup label='Nome: *' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Digite seu nome'
                                                                value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                                        </FormGroup>
                                                        <FormGroup label='Email: *' htmlFor='inputEmail'>
                                                            <input type='email' className='form-control' id='inputEmail'
                                                                area-aria-describedby='emailHelp' placeholder='Digite o email'
                                                                value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                                        </FormGroup>
                                                        <FormGroup label='Senha:*' htmlFor='inputPassword'>
                                                            <input type='password' className='form-control' id='inputPessword'
                                                                placeholder='Digite a senha'
                                                                value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                                                        </FormGroup>
                                                        <br />
                                                        <div className="buttons-wrapper">
                                                            <GoBack/>
                                                            <button type="submit" className='btn btn-success'>Cadastrar</button>
                                                        </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
