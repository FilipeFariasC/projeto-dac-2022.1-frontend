import React from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
import GoBack from '../../components/GoBack';
import {withRouter} from 'react-router-dom';

class UserLogin extends React.Component {

    state = {
        email: '',
        password: ''
    }

    async login() {
        console.log("Criando");
        await axios.post('http://localhost:8080/api/login',
            {
                username: this.state.email,
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
            localStorage.setItem('jwt_token', response.data.response);
            this.props.history.push('/');
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
                                                        <FormGroup label='Email:' htmlFor='inputEmail'>
                                                            <input type='email' className='form-control' id='inputEmail'
                                                                area-aria-describedby='emailHelp' placeholder='Digite o email'
                                                                value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                                        </FormGroup>
                                                        <FormGroup label='Senha:' htmlFor='inputPassword'>
                                                            <input type='password' className='form-control' id='inputPessword'
                                                                placeholder='Digite a senha'
                                                                value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
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
