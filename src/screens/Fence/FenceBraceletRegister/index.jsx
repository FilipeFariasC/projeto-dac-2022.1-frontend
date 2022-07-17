import { withRouter } from "react-router";
import { Component } from "react";
import Navbar from "components/Navbar";
import PaginaNaoEncontrada from "components/PaginaNaoEncontrada";

import FenceApiService from "services/serviceSpecific/FenceApiService";
import BraceletApiService from "services/serviceSpecific/BraceletApiService";

import Card from "components/Card";
import {Container} from "components/Container"
import { Link } from "react-router-dom";

class FenceBraceletRegister extends Component {

    constructor(props) {
        super(props);
        this.fenceService = new FenceApiService();
        this.braceletService = new BraceletApiService();
        this.state = {
            found: false,
            fence: {},
            bracelets: [],
            selected: []
        }
    }

    async componentDidMount() {
        await this.fenceService.findById(this.props.match.params.id)
            .then(response => {
                const fence = response.data;
                this.setState({
                    fence,
                    found: true
                })
            })
            .catch(()=>{
                this.setState({found: false});
            });
        await this.braceletService.find({
            page: 0,
            size: 15,
            sort: "id,asc"
        }).then(response => {
            const bracelets = response.data.content;
            this.setState({
                bracelets,
                found: true
            })
        }).catch(()=>{
            this.setState({found: false});
        });
    }

    changeStateSelected(bracelet) {
        console.log(this.state.selected);
        if(this.state.selected.includes(bracelet)){
            console.log("CONTÉM");
            const index = this.state.selected.indexOf(bracelet);
            this.state.selected.splice(index, 1);
            this.setState({selected: this.state.selected})
        } else {
            console.log(bracelet);
            this.state.selected.push(bracelet);
            this.setState({selected: this.state.selected});
        }
    }
    createBraceletRow(bracelet) {
        return (
            <div key={bracelet.id}>
                <input key={bracelet.id}
                    id={`bracelet-${bracelet.id}`}
                    name={`bracelet-${bracelet.id}`}
                    type="checkbox"
                    onChange={(event)=>this.changeStateSelected(bracelet)}
                    value={bracelet}
                    label={bracelet.name}
                    />
                <label htmlFor={`bracelet-${bracelet.id}`}><Link className="text-decoration-none text-reset" to={`/bracelets/${bracelet.id}`}>{bracelet.name}</Link></label>
            </div>
        );
        
    }

    render() {
        if(!this.state.found){
            return (
                <>
                    <Navbar/>
                    <PaginaNaoEncontrada/>
                </>
            );
        }
        return (
            <>
                <Navbar/>
                <Container>
                    <Card title={this.state.fence.name}>
                        {this.state.bracelets.map(bracelet=>this.createBraceletRow(bracelet))}
                    </Card>
                </Container>

            </>
        );
    }
}

export default withRouter(FenceBraceletRegister);
