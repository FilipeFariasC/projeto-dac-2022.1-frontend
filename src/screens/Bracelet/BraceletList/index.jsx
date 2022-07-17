import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../../components/Card';
import FormGroup from '../../../components/FormGroup';
import { ListTable } from '../../../components/ListTable';
import NavBar from '../../../components/Navbar';
import BraceletApiService from '../../../services/serviceSpecific/BraceletApiService';

class BraceletList extends React.Component {

    state = {
        bracelets: []
    }

    constructor(){
        super();
        this.service = new BraceletApiService(); 
    }

    async componentDidMount() {
        await this.service.find(
            {
                params: {
                    "page": 0,
                    "size": 15,
                    "sort": "id,ASC"
                }
            }
        ).then(response => {
            const bracelets = response.data.content;
            this.setState({ bracelets });
        }).catch(error => {
            console.log(error.response);
        });
    }

    find = async () => {
        var params = '';

        if (this.state.name !== '') {
            params = `search?name=${this.state.name}`;
        }
        await this.service.findByName(params).then(response => {
            const bracelets = response.data;
            this.setState({ bracelets });
        }).catch(error => {
            console.log(error.response);
        });
        
    }

    delete = (id) => {
        this.service.delete(id)
        .catch(error => {
            console.log(error.response);
        })
    }

    edit = (id) => {
        this.props.history.push(`/updateBracelet/${id}`);
    }

    render() {
        return (
            <>
                <NavBar />
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 braceletList'
                            style={
                                {
                                    margin: "0 auto",
                                    paddingBlock: "2.5rem"
                                }
                            }
                        >
                            <div className='bs-docs-section'>
                                <Card title='Listar Pulseiras'>
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
                                                        <div className="buttons-wrapper"
                                                            style={
                                                                {
                                                                    display: "flex",
                                                                    justifyContent: "space-between"
                                                                }
                                                            }
                                                        >
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
                                                <ListTable entity="bracelets" data={this.state.bracelets}/>
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

export default withRouter(BraceletList);

