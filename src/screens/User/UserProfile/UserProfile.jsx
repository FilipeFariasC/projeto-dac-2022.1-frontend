import React, {Component} from "react";
import Navbar from "../../../components/Navbar";
import Card from "../../../components/Card";
import {Link} from "react-router-dom";
import UserApiService from "../../../services/serviceSpecific/UserApiService";
import BraceletApiService from "../../../services/serviceSpecific/BraceletApiService";
import FenceApiService from "../../../services/serviceSpecific/FenceApiService";
import ListMin from "../../../components/ListMin"

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.userService= new UserApiService();
        this.fenceService = new FenceApiService();
        this.braceletService = new BraceletApiService();

        this.state = {
            user: {
                id: 0,
                name: '',
                email: ''
            },
            fences:[],
            bracelets: []
        }
        this.params = {
            page: 0,
            size: 5,
            sort: 'id,asc'
        }
    }

    async componentDidMount() {
        await this.userService.find("user")
        .then(response => {
            this.setState({
                user: response.data
            })
        });
        await this.fenceService.find(this.params)
        .then(response => {
            const fences = response.data.content;
            this.setState({
                fences
            })
        });
        await this.braceletService.find(this.params)
        .then(response => {
            const bracelets = response.data.content;
            this.setState({
                bracelets
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
                            <Link to="/users/update" className="btn btn-primary">Editar Usuário</Link>
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
                                <ListMin 
                                    data={this.state.bracelets} 
                                    entity="Pulseiras" 
                                    
                                    list="/bracelets" 
                                />
                            </div>
                            <div className="fence-profile">
                                <h4>Cercas</h4>
                                <ListMin 
                                    data={this.state.fences} 
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