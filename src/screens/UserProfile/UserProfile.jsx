import React, {Component} from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import "./css/UserProfile.css";
import axios from "axios";

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'Filipe Farias',
                email: 'admin@admin.com'
            }
        }
    }

    render(){
        return (
            <>
                <Navbar/>
                <div className="container container-fluid flex">
                    <Card className="user-profile" title="Perfil do usuário">
                        <h3>{this.state.user.name}</h3>
                        <div className="email-wrapper">
                            <span>Email: </span>
                            <span>{this.state.user.email}</span>
                        </div>
                    </Card>
                    <Card className="bracelet-and-fence-profile" title="Perfil do usuário">
                        <div className="bracelet-profile">
                            <h1>Pulseiras</h1>
                            <BraceletList/>
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
        let response = await axios.post("http://localhost:8080/api/login", 
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

        let braceletList = await axios.get('http://localhost:8080/api/bracelets/',
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
            <li key={bracelet.id} className="list-group-item">
                <strong>{bracelet.name}</strong>
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
                    <button className="btn btn-primary">Cadastrar Pulseira</button>
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
