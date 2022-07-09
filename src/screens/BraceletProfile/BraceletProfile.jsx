import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
//import UserApiService from "../../services/serviceSpecific/UserApiService";
import BraceletApiService from "../../services/serviceSpecific/BraceletApiService";
import FenceApiService from "../../services/serviceSpecific/FenceApiService";


export default class BraceletProfile extends Component {

    constructor(props) {
        super(props);
        this.service = new BraceletApiService();
        this.state = {
            bracelet: {
                name: ''
                
            }
        }
    }
    /* recebe um id de uma bracelet selecionada;*/
    async componentDidMount() {
        await this.service.findById(2).then(response => {
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
                            <Link to="/updateBracelet/:id" className="btn btn-primary">Editar Pulseira</Link>
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
                                <h4>Cerca</h4>
                                <FenceList />
                            </div>
                        </div>
                    </Card>
                </div>
            </>
        );
    }
}

class FenceList extends Component {

    constructor(props) {
        super(props);
        this.service = new FenceApiService();
        this.state = {
            fenceList : [],
            size: 5
        }
    }

    async componentDidMount(){
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
            this.setState({fenceList: page.content});
            this.setState({size: page.totalElements});
        }).catch((error) => {
            console.log(error);
        });
    }

    fenceRow(fence){
        return (
            <li key={fence.id} className="list-group-item flex fenceRowOptions"
                style={
                    {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }
                }
            >
                <strong className="fenceName" 
                    style={
                        {
                            fontSize: "0.75rem",
                            whiteSpace: "nowrap"
                        }
                    }
                >{fence.name}</strong>
                <Link className="btn btn-primary" to={`/updateFence/${fence.id}`}>
                    Editar
                </Link>
                <a className="btn btn-danger" href="#" >
                    Excluir
                </a>
            </li>
        );
    }
    fenceList(){
        return this.state.fenceList.map(fence => this.fenceRow(fence));
    }

    render(){
        if(this.state.fenceList.length === 0){
            return(
                <div className="flex">
                    <Link className="btn btn-primary" to="/createFence"
                        style={
                            {
                                width: "100%"
                            }
                        }
                    >Cadastrar Cerca </Link>
                </div>
            );
        }

        return (
            <>
                <ul className="list-group">
                    {this.fenceList()}

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
                        <Link className="btn btn-info" to="/fences"> Cercas </Link>
                    </li>
                </ul>
            </>
        );
    }
}
