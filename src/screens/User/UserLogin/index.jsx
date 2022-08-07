import React from 'react';
import axios from 'axios';
import Card from '../../../components/Card';
import FormGroup from '../../../components/FormGroup';
import NavBar from '../../../components/Navbar';
import GoBack from '../../../components/GoBack';
import {withRouter} from 'react-router-dom';
import { switchValidation } from 'services/ValidationService';
import {showSuccessMessage, showErrorMessage} from "../../../components/Toastr";
import { LoginService } from 'services/LoginService';

class UserLogin extends React.Component {


    constructor() {
        super();
        this.loginService = new LoginService();
        this.state = {
            email: '',
            password: ''
        }
    }

    #getUserDetails(){
        return {
            username: this.state.email,
            password: this.state.password
        }
    }

    async login() {
        await this.loginService.login(this.#getUserDetails())
        .then(response =>{
            showSuccessMessage('', 'Login realizado com sucesso!');
            this.props.history.push('/profile');
        }).catch(error => {
            showErrorMessage('', 'Email ou senha incorretos!');
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
                                <Card title='Login'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event=>{
                                                    event.preventDefault();
                                                    this.login()}
                                                    }>
                                                    <fieldset>
                                                        <FormGroup label='Email' htmlFor='inputEmail'>
                                                            <input type='email' className='form-control' id='inputEmail'
                                                                area-aria-describedby='emailHelp' placeholder='Digite o email'
                                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                                title="Deve seguir o padrão de email, exemplo: adriano.oliveira@protonmail.com"
                                                                value={this.state.email} onChange={(e) =>
                                                                    {
                                                                        if(e.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                                                                            switchValidation(e.target, true);
                                                                        } else{
                                                                            switchValidation(e.target, false);
                                                                        }
                                                                        this.setState({ email: e.target.value })
                                                                    }
                                                                } />
                                                        </FormGroup>
                                                        <FormGroup label='Senha' htmlFor='inputPassword'>
                                                            <input type='password' className='form-control' id='inputPassword'
                                                                placeholder='Digite a senha'
                                                                value={this.state.password} 
                                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                                title="Senha entre 8 e 30 caracteres."
                                                                onChange={(e) =>
                                                                    {
                                                                        if(e.target.value.length > 8 && e.target.value.length < 30){
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
                                                            <button type="submit" className='btn btn-success'>Login</button>
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

export default withRouter(UserLogin);
