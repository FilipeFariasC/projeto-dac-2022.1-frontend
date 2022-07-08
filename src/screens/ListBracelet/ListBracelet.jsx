import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
//import GoBack from '../../component/GoBack';
import BraceletApiService from '../../services/serviceSpecific/BraceletApiService';

class ListBracelet extends React.Component {

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

    braceletRow(bracelet){
        return (
            <tr className="table-info" key={bracelet.id}
                style={
                    {
                        width: "100%"
                    }
                }
            >
                <td>{bracelet.name}</td>
                <td
                    style={
                        {
                            width: "100%"
                        }
                    }
                >
                    <div className="btn-group" role="group" aria-label="Basic example"
                        style={
                            {
                                display: "flex",
                            }
                        }
                    >
                        <Link className="btn btn-secondary" to={`/updateBracelet/${bracelet.id}`}>Editar</Link>
                        <a type="button" className="btn btn-danger" href="#">Excluir</a>
                    </div>
                </td>
            </tr>
        );
    }

    braceletList(braceletList){
        return (
            <table className="table table-hover"
                style={
                    {
                        tableLayout: "fixed",
                        width: "100%",
                    }
                }
            >
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {braceletList.map(bracelet =>  this.braceletRow(bracelet))}
                </tbody>
            </table>

        )
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
                                                {this.braceletList(this.state.bracelets)}
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

