import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
//import GoBack from '../../component/GoBack';
import './css/UpdateBracelet.css';

class UpdateBracelet extends React.Component {

    state = {
        id: '',
        name: ''
    }

    componentDidMount(){
        const params = this.props.match.params;
        const id = params.id;
        this.findById(id);
    }

    update = async () => {
        await axios.put(`http://localhost:8080/api/users/bracelets/${this.state.id}`,
            {
                id: this.state.id,
                name: this.state.name
            }
        ).then(response => {
            console.log(response);
        }
        ).catch(response => {
            console.error();
        }
        );
    }

    findById = (id) => {
        axios.get(`http://localhost:8080/api/users/bracelets?id=${id}`)
        .then( response => 
            {
                const bracelet = response.data[0];
                const id = bracelet.id;
                const name = bracelet.name;

                this.setState({id,name});

            }
        ).catch( error => 
            {
                console.log(error.response);
            }
        )
    }

    render() {
        return (
            <>
                <NavBar />
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 braceletUpdadet'>
                            <div className='bs-docs-section'>
                                <Card title='Atualizar Pulseria'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event => {
                                                    event.preventDefault();
                                                    this.update()
                                                }
                                                }>
                                                    <fieldset>
                                                        <FormGroup label='Id: *' htmlFor='id'>
                                                            <input type='text' className='form-control' id='id'
                                                                disabled={true}
                                                                placeholder= 'id'
                                                                value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} />
                                                        </FormGroup>
                                                        <FormGroup label='Nome: *' htmlFor='name'>
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

export default withRouter(UpdateBracelet);