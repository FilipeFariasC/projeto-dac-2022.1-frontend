import React from 'react';
import 'bootswatch/dist/minty/bootstrap.css';
import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import NavBar from '../../components/NavBar';

export default class CreateUser extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        result: ''
    }

    create = async () => {
        await axios.post('http://localhost:8080/api/users',
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',

                },
                data: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                }
            }
        ).then(response => {
            console.log(response);
        }
        ).catch(error => {
            console.log(error.response);
        }
        );
    }


    render() {
        return (
            <>
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6' style={this.style.colMd6}>
                            <div className='bs-docs-section'>
                                <Card title='Cadastro de Usuario'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={this.create}>
                                                    <fieldset>
                                                        <FormGroup label='Nome: *' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Digite seu nome'
                                                                value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                                        </FormGroup>
                                                        <FormGroup label='Email: *' htmlFor='inputEmail'>
                                                            <input type='email' className='form-control' id='inpultEmail'
                                                                area-aria-describedby='emailHelp' placeholder='Digite o email'
                                                                value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                                        </FormGroup>
                                                        <FormGroup label='Senha:*' htmlFor='inputPassword'>
                                                            <input type='password' className='form-control' id='inpultPessword'
                                                                placeholder='Digite a senha'
                                                                value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                                                        </FormGroup>
                                                        <br />
                                                        <button className='btn btn-danger'>cancel</button>
                                                        <button className='btn btn-success' onClick={this.create} style={this.style2.btnSuccess}>Cadastrar</button>
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
    style = {
        colMd6: {
            position: 'relative',
            top: '50px',
            left: '300px'


        }
    }
    style2 = {
        btnSuccess: {
            
            position: 'absolute',
            margin :'0 15px',
            top:'275px',
            left:'350px'
        }
    }
}
