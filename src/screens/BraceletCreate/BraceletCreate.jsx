import React, {Component} from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import GoBack from "../../components/GoBack";
import FormGroup from "../../components/FormGroup";
import {withRouter} from "react-router-dom";
import BraceletApiService from "../../services/serviceSpecific/BraceletApiService";


class BraceletCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bracelet: {
                name: ""
            }
        }
        this.service = new BraceletApiService();
    }

    create = async() => {
        await this.service.create( 
            this.state.bracelet
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

