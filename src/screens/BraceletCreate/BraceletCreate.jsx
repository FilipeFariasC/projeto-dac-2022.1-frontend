import React, {Component} from "react";
import Navbar from "../../components/Navbar";
import GoBack from "../../components/GoBack";
import FormGroup from "../../components/FormGroup";
import axios from "axios";

class BraceletCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bracelet: {
                name: ""
            },
            error: ""
        }
    }

    create = async() => {
        await axios.post("http://localhost:8080/bracelets", 
            this.state.bracelet,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Authorization": "Bearer " + window.localStorage.getItem("jwt_token"),
                }
            }
        );
    }

    render(){
        return(
            <>
                <Navbar/>
                <div className="container container-fluid">
                    <row className="col-md-6">
                        <form onSubmit={event=>{this.create()}}>
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
                                <div className="buttons-wrapper">
                                    <GoBack/>
                                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                                </div>
                            </fieldset>
                        </form>
                    </row>
                </div>
            </>
        )
    }
}

export default BraceletCreate;

