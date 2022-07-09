import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
//import UserApiService from "../../services/serviceSpecific/UserApiService";
import BraceletApiService from "../../services/serviceSpecific/BraceletApiService";
import FenceApiService from "../../services/serviceSpecific/FenceApiService";


export default class FenceProfile extends Component {

    constructor(props) {
        super(props);
        this.service = new FenceApiService();
        this.state = {
            fence: {
                name: '',
                radius: 1,
                coordinate: {
                    latitude: null,
                    longitude: null
                },
                startTime: null,
                finishTime: null,
                tempCoordinates: {
                    lat: 0,
                    lng: 0
                },
                active: false,
                show: false
            }
        }
    }
    /*recebe um id de uma fence selecionada;
     não há relação entre fence e bracelet;
     mostrar as bracelets cadastradas na fence,
     colocar a localização do google map e 
     mostrar status da fence */
    async componentDidMount() {
        await this.service.findById(8).then(response => {
            this.setState({
                fence: response.data
            })
        });
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="container container-fluid flex profile-wrapper"
                    style={
                        {
                            width: "100%",
                            paddingBlock: "2.5rem",
                            alignItems: "flex-start",
                            flexGrow: "1",
                            flexBasis: "1",
                            flexShrink: "0"
                        }
                    }
                >
                    <Card className="fence-profile" title="Perfil da Cerca">
                        <table className="table table-primary table-hover user-info"
                            style={
                                {
                                    width: "100%"
                                }
                            }
                        >
                            <thead className="table-header table-primary"
                                style={
                                    {
                                        textAlign: "center"
                                    }
                                }
                            >
                                <tr>
                                    <td colSpan="2">
                                        <h5>Informações</h5>
                                    </td>
                                </tr>
                            </thead>
                            <tbody className="table-info">
                                <tr>
                                    <td>
                                        Nome:
                                    </td>
                                    <td>
                                        {this.state.fence.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Localização:
                                    </td>
                                    <td>
                                        {this.state.fence.localizacao}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Horário Inicial:
                                    </td>
                                    <td>
                                        {this.state.fence.startTime}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Horário Final:
                                    </td>
                                    <td>
                                        {this.state.fence.finishTime}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Status:
                                    </td>
                                    <td>
                                        {this.state.fence.active}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Raio:
                                    </td>
                                    <td>
                                        {this.state.fence.radius}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex"
                            style={
                                {
                                    justifyContent: "flex-end"
                                }
                            }
                        >
                            <Link to="/updateFence" className="btn btn-primary">Editar Cerca</Link>
                        </div>
                    </Card>
                    <Card title="Pulseiras">
                        <div className="bracelet profiles flex"
                            style={
                                {
                                    flexDirection: "column"
                                }
                            }
                        >
                            <div className="bracelet-profile">
                                <h4>Pulseiras</h4>
                                <BraceletList />
                            </div>
                        </div>
                    </Card>
                </div>
            </>
        );
    }
}

class BraceletList extends Component {

    constructor(props) {
        super(props);
        this.service = new BraceletApiService();
        this.state = {
            braceletList: [],
            size: 5
        }
    }

    async componentDidMount() {
        await this.service.find(
            {
                params: {
                    "page": 0,
                    "size": 5,
                    "sort": "id,ASC"
                }
            }
        ).then(response => {
            const page = response.data;
            this.setState({ braceletList: page.content });
            this.setState({ size: page.totalElements });
        }).catch((error) => {
            console.log(error);
        });
    }

    braceletRow(bracelet) {
        return (
            <li key={bracelet.id} className="list-group-item flex braceletRowOptions"
                style={
                    {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }
                }
            >
                <strong className="braceletName"
                    style={
                        {
                            fontSize: "0.75rem",
                            whiteSpace: "nowrap"
                        }
                    }
                >{bracelet.name}</strong>
                <Link className="btn btn-primary" to={`/updateBracelet/${bracelet.id}`}>
                    Editar
                </Link>
                <a className="btn btn-danger" href="#" >
                    Excluir
                </a>
            </li>
        );
    }
    braceletList() {
        return this.state.braceletList.map(bracelet => this.braceletRow(bracelet));
    }

    render() {
        if (this.state.braceletList.length === 0) {
            return (
                <div className="flex">
                    <Link className="btn btn-primary" to="/createBracelet"
                        style={
                            {
                                width: "100%"
                            }
                        }
                    >Cadastrar Pulseira</Link>
                </div>
            );
        }

        return (
            <>
                <ul className="list-group">
                    {this.braceletList()}
                    <li key={-1} className="list-group-item flex braceletRowOptions"
                        style={
                            {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                            }
                        }
                    >
                        <Link className="btn btn-info" to="/bracelets"> Pulseiras </Link>
                    </li>
                </ul>
            </>
        )
    }
}
