import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
//import GoBack from '../../component/GoBack';
import './css/UpdateBracelet.css';
import BraceletApiService from '../../services/serviceSpecific/BraceletApiService';

class UpdateBracelet extends React.Component {

    state = {
        name: ''
    }

    constructor(){
        super();
        this.servie = new BraceletApiService();
    }

    async componentDidMount(){
        console.log(this.props.match.params.id)
        await this.servie.findById(this.props.match.params.id,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("jwt_token")}`,
                }
            }

        ).then(response => {
            console.log(response);
            this.setState({name: response.data.name});
        }
        ).catch(response => {
            console.error();
        });
    }

    async update () {
        await this.servie.update(this.props.match.params.id,
            {
                name: this.state.name
            },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem("jwt_token"),
                }
            }

        ).then(response => {
            console.log(response);
            
            this.props.history.push("/listBracelet");
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
                        <div className='col-md-6 braceletUpdated'
                            style={
                                {
                                    margin: "0 auto",
                                    paddingBlock: "2.5rem"
                                }
                            }
                        >
                            <div className='bs-docs-section'>
                                <Card title='Atualizar Pulseira'>
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
                                                                placeholder='Nome da pulseira'
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
