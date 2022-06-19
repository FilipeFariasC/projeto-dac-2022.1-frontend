import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
import GoBack from '../../components/GoBack';
import UserApiService from '../../services/serviceSpecific/UserApiService';
import { switchValidation } from '../../services/ValidationService';
import {showErrorMessage, showSuccessMessage} from "../../components/Toastr";

class UpdateUser extends React.Component {

    constructor() {
        super();
        this.service = new UserApiService();
        this.state = {
            name: '',
            email: '',
            password: '123456789'
        }
    }

    async componentDidMount() {
        await this.service.find('user')
        .then(response => {
            const user = response.data;
            this.setState({
                name: user.name,
                email: user.email
            });

        }).catch(error => {
            console.log(error.response);
        })
    }

    update = async () => {
        await this.service.updateName({
            name:this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            showSuccessMessage('','Usuário atualizado com sucesso!');
            this.props.history.push("/profile")
        }).catch(response => {
            console.error();
            showErrorMessage('','Erro ao atualizar usuário!');
        });
    }

    render() {
        return (
            <>
                <NavBar />
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 userUpdate'
                            style={
                                {
                                    margin: "0 auto",
                                    paddingBlock: "2.5rem"
                                }
                            }
                        >
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
                                                        <FormGroup label='Nome' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Digite seu nome'
                                                                data-bs-toggle="tooltip"
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
