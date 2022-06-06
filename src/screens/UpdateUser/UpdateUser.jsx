import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
//import GoBack from '../../component/GoBack';
import './css/UpdateUser.css';

class UpdateUser extends React.Component {

    state = {
        name: ''
    }

    async componentDidMount(){
        await axios.get(`http://localhost:8080/api/users/user`,
            {
                headers: {
                    "Authorization": `Bearer ${window.localStorage.getItem("jwt_token")}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Content-Type": "application/json",
                }
            }
        ).then( response => {
            const user = response.data;
            console.log(user);
            this.setState({
                name:user.name
            });

        }).catch( error =>{
                console.log(error.response);
        })
    }

    update = async () => {
        await axios.patch(`http://localhost:8080/api/users/user`,
            this.state.name,
            {
                headers: {
                    "Authorization": `Bearer ${window.localStorage.getItem("jwt_token")}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                }
            }
        ).then(response => {
            console.log(response);
            this.props.history.push("/profile")
        }
        ).catch(response => {
            console.error();
        }
        );
    }
    render() {
        return (
            <>
                <NavBar />
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 userUpdadet'>
                            <div className='bs-docs-section'>
                                <Card title='Atualizar Usuário'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event => {
                                                    event.preventDefault();
                                                    this.update()
                                                }
                                                }>
                                                    <fieldset>
                                                        <FormGroup label='Nome: ' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Digite seu nome'
                                                                value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                                        </FormGroup>

                                                        <br />
                                                        <div className="buttons-wrapper">
                                                            
                                                            <button type="submit" className='btn btn-success'>Atualizar</button>
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

export default withRouter(UpdateUser);
