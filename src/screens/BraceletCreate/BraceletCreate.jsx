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
            }
        }
    }

    create = async() => {
        await axios.post("http://localhost:8080/bracelets", this.state.bracelet);
    }

    render(){
        return(
            <>
                <Navbar/>
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
            </>
        )
    }
}

export default BraceletCreate;

