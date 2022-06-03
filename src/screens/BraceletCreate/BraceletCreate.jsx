import React, {Component} from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import GoBack from "../../components/GoBack";
import FormGroup from "../../components/FormGroup";
import axios from "axios";
import {withRouter} from "react-router-dom";


class BraceletCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bracelet: {
                name: ""
            }
        }
    }

    create = async() => {
        await axios.post("http://localhost:8080/api/login", 
            {
                username: 'admin@admin.com',
                password: 'admin20221'
            }
        ).then(response => {
            window.localStorage.setItem('jwt_token', response.data.response);
        });
        await axios.post("http://localhost:8080/api/bracelets", 
            this.state.bracelet,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem("jwt_token"),
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    
                }
            }
        ).then(response => {
            this.props.history.push("/profile");
        });;
    }

    render(){
        return(
            <>
                <Navbar/>
                <div className="container container-fluid">
                    <div className="col-md-6 braceletRegister" 
                        style={
                            {
                                width: "100%",
                                paddingBlock: "2.5rem"
                            }
                        }
                    >
                        <Card className="braceletFormCard" title="Cadastro de Pulseira"
                            style={
                                {
                                    width: '50%',
                                    margin: "0 auto"
                                }
                            }
                        >
                            <form className="form braceletForm" 
                                onSubmit={
                                    event=>
                                        {
                                            event.preventDefault();
                                            this.create()
                                        }
                                }
                                style={
                                    {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem"
                                    }
                                }
                            >
                                <fieldset>
                                    <FormGroup htmlFor={"braceletFormName"} label={"Nome da Pulseira"}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="braceletFormName"
                                            name="braceletFormName"
                                            placeholder="Nome da Pulseira"
                                            value={this.state.bracelet.name}
                                            onChange={(e) => this.setState({ bracelet: { name: e.target.value } })}
                                        />
                                    </FormGroup>
                                </fieldset>
                                <div className="buttons-wrapper"
                                    style={
                                        {
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }
                                    }
                                >
                                    <GoBack/>
                                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(BraceletCreate);

