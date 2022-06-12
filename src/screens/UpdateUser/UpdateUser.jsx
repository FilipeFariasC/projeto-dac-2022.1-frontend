import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
//import GoBack from '../../component/GoBack';
import UserApiService from '../../services/serviceSpecific/UserApiService';

class UpdateUser extends React.Component {

    state = {
        name: ''
    }

    constructor() {
        super();
        this.service = new UserApiService();
    }

    async componentDidMount() {
        await this.service.find('user',
            {
                headers: {
                    "Authorization": `Bearer ${window.localStorage.getItem("jwt_token")}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Content-Type": "application/json",
                }
            }
        ).then(response => {
            const user = response.data;
            console.log(user);
            this.setState({
                name: user.name
            });

        }).catch(error => {
            console.log(error.response);
        })
    }

    update = async () => {
        await this.service.updateOne(this.state.id,
            {
                name: this.state.name
            },
            {
                headers: {
                    "Authorization": `Bearer ${window.localStorage.getItem("jwt_token")}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Content-Type": "application/json",
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
                                                        <FormGroup label='Nome: ' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Digite seu nome'
                                                                value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
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
