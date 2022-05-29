import React, {Component} from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import axios from "axios";
import {Link} from "react-router-dom";
import "./css/UserProfile.css";

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: 0,
                name: '',
                email: ''
            }
        }
    }

    async componentDidMount() {
        await axios.post("http://localhost:8080/api/login", 
            {
                username: 'admin@admin.com',
                password: 'admin20221'
            },
            {
                headers: {
                    "Access-Control-Allow-Origin": '*',
                    "Access-Control-Allow-Methods": 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                }
            }
        ).then(response => {
            window.localStorage.setItem('jwt_token', response.data.response);
        });
        await axios.get("http://localhost:8080/api/users/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("jwt_token"),
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
                <div className="container container-fluid flex profile-wrapper">
                    <Card className="user-profile" title="Perfil do usuário">
                        <table className="table table-primary table-striped user-info">
                            <thead className="table-header">
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
                    </Card>
                    <Card title="Pulseiras e Cercas">
                        <div className="bracelet-and-fence-profiles flex">
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
        this.state = {
            braceletList : []
        }
    }

    async componentDidMount(){
        await axios.get('http://localhost:8080/api/bracelets/',
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
                    "Access-Control-Allow-Origin": '*',
                    "Access-Control-Allow-Methods": 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                }
            }
        ).then(response => {
            this.setState({braceletList: response.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    braceletRow(bracelet){
        return (
            <li key={bracelet.id} className="list-group-item flex braceletList">
                <strong className="braceletName" >{bracelet.name}</strong>
                <a className="btn btn-primary" href="#">
                    Editar
                </a>
                <a className="btn btn-secondary" href="#" >
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
                    <Link className="btn btn-primary" to="/createBracelet">Cadastrar Pulseira</Link>
                </div>
            );
        }

        return (
            <>
                <ul className="list-group">
                    {this.braceletList()}
                </ul>
            </>
        )
    }
}


class FenceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fenceList : []
        }
    }

    async componentDidMount(){
        await axios.get('http://localhost:8080/api/fences/',
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
                    "Access-Control-Allow-Origin": '*',
                    "Access-Control-Allow-Methods": 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                }
            }
        ).then(response => {
            this.setState({braceletList: response.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        return (
            <>
            </>
        );
    }
}
