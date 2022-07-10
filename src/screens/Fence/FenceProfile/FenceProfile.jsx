import React, { Component } from "react";
import Navbar from "../../../components/Navbar";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import GoBack from "components/GoBack";
import ListMin from "components/ListMin";
//import UserApiService from "../../services/serviceSpecific/UserApiService";
import BraceletApiService from "../../../services/serviceSpecific/BraceletApiService";
import FenceApiService from "../../../services/serviceSpecific/FenceApiService";


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
                show: false,
                bracelets: []
            }
        }
    }
    /*recebe um id de uma fence selecionada;
     não há relação entre fence e bracelet;
     mostrar as bracelets cadastradas na fence,
     colocar a localização do google map e 
     mostrar status da fence */
    async componentDidMount() {
        await this.service.findById(1).then(response => {
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
                            <GoBack/>
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
                                <ListMin 
                                    data={this.state.fence.bracelets} 
                                    entity="Puceiras" 
                                    list="/bracelets"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </>
        );
    }
}

