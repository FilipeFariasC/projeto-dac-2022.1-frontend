import React, {Component} from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import axios from "axios";
import {Link} from "react-router-dom";
import UserApiService from "../../services/serviceSpecific/UserApiService";
import BraceletApiService from "../../services/serviceSpecific/BraceletApiService";
import FenceApiService from "../../services/serviceSpecific/FenceApiService";

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.service= new UserApiService();
        this.state = {
            user: {
                id: 0,
                name: '',
                email: ''
            }
        }
    }

    async componentDidMount() {
        await this.service.find("user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            }
        }).then(response => {
            this.setState({
                user: response.data
            })
        });
    }

    render(){
        return (
            <>
                <Navbar/>
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
                    <Card className="user-profile" title="Perfil do usuário">
                        <table className="table table-primary table-striped user-info"
                            style={
                                {
                                    width: "100%"
                                }
                            }
                        >
                            <thead className="table-header"
                                style={
                                    {
                                        textAlign: "center"
                                    }
                                }
                            >
                                <tr className="table-primary">
                                    <td colSpan="2">
                                        <h5>Informações</h5>
                                    </td>
                                </tr>
                            </thead>
                            <tbody className="table-secondary">
                                <tr>
                                    <td>
                                        Nome:
                                    </td>
                                    <td>
                                        {this.state.user.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Email:
                                    </td>
                                    <td>
                                        {this.state.user.email}
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
                            <Link to="/updateUser" className="btn btn-primary">Editar Usuário</Link>
                        </div>
                    </Card>
                    <Card title="Pulseiras e Cercas">
                        <div className="bracelet-and-fence-profiles flex"
                            style={
                                {
                                    flexDirection: "column"
                                }
                            }
                        >
                            <div className="bracelet-profile">
                                <h4>Pulseiras</h4>
                                <BraceletList/>
                            </div>
                            <div className="fence-profile">
                                <h4>Cercas</h4>
                                <FenceList/>
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
            braceletList : [],
            size: 5
        }
    }

    async componentDidMount(){
        await this.service.find(
            {
                headers: {
                    "page": 0,
                    "size": 5,
                    "sort": "id,ASC"
                }
            }
        ).then(response => {
            const page = response.data;
            this.setState({braceletList: page.content});
            this.setState({size: page.totalElements});
        }).catch((error) => {
            console.log(error);
        });
    }

    braceletRow(bracelet){
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
    braceletList(){
        return this.state.braceletList.map(bracelet => this.braceletRow(bracelet));
    }

    render(){
        if(this.state.braceletList.length === 0){
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
                headers: {
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
