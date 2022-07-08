import React from 'react';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
import GoBack from '../../components/GoBack';
import {withRouter} from 'react-router-dom';
import UserApiService from '../../services/serviceSpecific/UserApiService';
import axios from 'axios';
import {switchValidation } from '../../services/ValidationService';
import {showSuccessMessage, showErrorMessage} from '../../components/Toastr';

class CreateUser extends React.Component {
    
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    create = async () => {
        await axios.post('http://localhost:8080/api/users',
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
        ).then(response => {
            showSuccessMessage('', 'Usuario criado com sucesso!');
            this.props.history.push('/login');
        }
        ).catch(error => {
            console.log(error);
            const data = error.response.data;
            if(data.errors){
                data.errors?.forEach(error => {
                    showErrorMessage('', error.messageUser);
                });
            } else{
                showErrorMessage('', data);
            }
            
        });
    }

    render() {
        return (
            <>
                <NavBar/>
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 userRegister'
                            style={
                                {
                                    margin: "0 auto",
                                    paddingBlock: "2.5rem"
                                }
                            }
                        >
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
                                                        <FormGroup label='Nome' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Digite seu nome'
                                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                                title="Nome tem entre 3 e 50 caracteres."
                                                                value={this.state.name} onChange={(e) =>{
                                                                        if(e.target.value.length >= 3 && e.target.value.length <= 50){
                                                                            switchValidation(e.target, true);
                                                                        } else{
                                                                            switchValidation(e.target, false);
                                                                        }
                                                                        this.setState({ name: e.target.value })
                                                                    }
                                                                } />
                                                        </FormGroup>
                                                        <FormGroup label='Email' htmlFor='inputEmail'>
                                                            <input type='email' className='form-control' id='inputEmail'
                                                                area-aria-describedby='emailHelp' placeholder='Digite o email'
                                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                                title="Deve seguir o padrão de email, exemplo: adriano.oliveira@protonmail.com"
                                                                value={this.state.email} onChange={(e) =>
                                                                    {
                                                                        if(e.target.value.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")){
                                                                            switchValidation(e.target, true);
                                                                        } else{
                                                                            switchValidation(e.target, false);
                                                                        }
                                                                        this.setState({ email: e.target.value })
                                                                    }
                                                                } />
                                                        </FormGroup>
                                                        <FormGroup label='Senha:*' htmlFor='inputPassword'>
                                                            <input type='password' className='form-control' id='inputPessword'
                                                                placeholder='Digite a senha'
                                                                value={this.state.password} 
                                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                                title="Senha entre 8 e 30 caracteres."
                                                                onChange={(e) =>
                                                                    {
                                                                        if(e.target.value.length >= 8 && e.target.value.length <= 30){
                                                                            switchValidation(e.target, true);
                                                                        } else{
                                                                            switchValidation(e.target, false);
                                                                        }
                                                                        this.setState({ password: e.target.value })
                                                                    }
                                                                } />
                                                        </FormGroup>
                                                        <br />
                                                        <div className="buttons-wrapper"
                                                            style={
                                                                {
                                                                    display: "flex",
                                                                    justifyContent: "space-between"
                                                                }
                                                            }
                                                        >
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

export default withRouter(CreateUser);
