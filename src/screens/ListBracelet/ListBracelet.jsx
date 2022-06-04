import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
import BraceletTable from '../../components/BraceletTable';
import '../ListBracelet/css/ListBracelet.css';
//import GoBack from '../../component/GoBack';

class ListBracelet extends React.Component {

    state = {
        id: '',
        name: '',
        bracelets: []
    }

    componentDidMount() {
        this.find();
    }

    find = () => {
        var params = '?';

        if (this.state.name !== '?') {
            if (params !== '?') {
                params = `${params}&`;
            }
            params = `${params}name=${this.state.name}`;
        }

        axios.get(`http://localhost:8080/api/users/bracelets/${params}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
                    "Access-Control-Allow-Origin": '*',
                    "Access-Control-Allow-Methods": 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                }
            })
            .then(response => {
                const bracelets = response.data;
                this.setState({ bracelets });
                console.log(bracelets);
            }).catch(error => {
                console.log(error.response);
            });
    }

    delete = (id) => {
        axios.delete(`http://localhost:8080/api/users/bracelets/${id}`
        ).then(response => {
            this.find();
        }
        ).catch(error => {
            console.log(error.response);
        }
        )
    }

    edit = (id) => {
        this.props.history.push(`/UpdateBracelet/${id}`);
    }

    render() {
        return (
            <>
                <NavBar />
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 braceletList'>
                            <div className='bs-docs-section'>
                                <Card title='Listar Puseiras'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event => {
                                                    event.preventDefault();
                                                    this.find()
                                                }
                                                }>
                                                    <fieldset>
                                                        <FormGroup label='Nome: *' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Digite o nome'
                                                                value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                                        </FormGroup>
                                                        <br />
                                                        <div className="buttons-wrapper">
                                                            <button type="submit" className='btn btn-success'>Buscar</button>
                                                        </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='bs-component'>
                                                <BraceletTable bracelets={this.state.bracelets}
                                                    delete={this.delete}
                                                    edit={this.edit} />
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

export default withRouter(ListBracelet);