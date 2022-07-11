import React, { Component } from "react";
import Navbar from "../../../components/Navbar";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import GoBack from "components/GoBack";
//import UserApiService from "../../services/serviceSpecific/UserApiService";
import BraceletApiService from "../../../services/serviceSpecific/BraceletApiService";
//import FenceApiService from "../../../services/serviceSpecific/FenceApiService";
import ListMin from "../../../components/ListMin";


export default class BraceletProfile extends Component {

    constructor(props) {
        super(props);
        this.serviceBracelet = new BraceletApiService();
        this.state = {
            bracelet: {
                name: '',  
                fences:[]
            },
        }
    }
    /* recebe um id de uma bracelet selecionada;*/
    async componentDidMount() {
        await this.serviceBracelet.findById(1).then(response => {
            this.setState({
                bracelet: response.data
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
                    <Card className="fence-profile" title="Perfil da Pulseira">
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
                                        {this.state.bracelet.name}
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
                        </div>
                    </Card>
                    <Card title="Cercas">
                        <div className="fence-profiles flex"
                            style={
                                {
                                    flexDirection: "column"
                                }
                            }
                        >
                            <div className="fence-profile">
                                <h4>Cercas</h4>
                                <ListMin 
                                    data={this.state.bracelet.fences} 
                                    entity="Cercas" 
                                    list="/fences"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </>
        );
    }
}


