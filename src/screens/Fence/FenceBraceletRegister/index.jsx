import { withRouter } from "react-router";
import { Component } from "react";
import Navbar from "components/Navbar";
import PaginaNaoEncontrada from "components/PaginaNaoEncontrada";

import FenceApiService from "services/serviceSpecific/FenceApiService";
import BraceletApiService from "services/serviceSpecific/BraceletApiService";
import FenceBraceletApiService from "services/serviceSpecific/FenceBraceletApiService";

import {showErrorMessage} from  "components/Toastr";
import InputGroup from "components/InputGroup";
import Card from "components/Card";
import {Container} from "components/Container"
import { Link } from "react-router-dom";

class FenceBraceletRegister extends Component {

    constructor(props) {
        super(props);
        this.fenceService = new FenceApiService();
        this.braceletService = new BraceletApiService();
        this.fenceBraceletService = new FenceBraceletApiService();
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
                const bracelets = fence.bracelets.map(bracelet => bracelet.id);
                this.setState({selected: bracelets});
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
                bracelets
            })
        }).catch(()=>{
            this.setState({found: false});
        });
    }

    async changeStateSelected(bracelet) {
        if(this.state.selected.includes(bracelet.id)){
            const index = this.state.selected.indexOf(bracelet.id);
            this.state.selected.splice(index, 1);
            this.setState({selected: this.state.selected})
            await this.fenceBraceletService.delete(
            {
                params: {
                    fence: this.state.fence.id,
                    bracelet: bracelet.id
                }
            }).catch((error)=>{
                showErrorMessage('',error);
            });
        } else {
            this.state.selected.push(bracelet.id);
            this.setState({selected: this.state.selected});
            await this.fenceBraceletService.save(
            {
                params: {
                    fence: this.state.fence.id,
                    bracelet: bracelet.id
                }
            }).catch((error)=>{
                showErrorMessage('',error);
            });
        }
    }
    createBraceletRow(bracelet) {
        return (
            <div key={bracelet.id}
                style={
                    {
                        display: "flex",
                        gap: "1rem"
                    }
                }
                className="form-check form-switch"
            >
                <input key={bracelet.id}
                id={`bracelet-${bracelet.id}`}
                checked={this.state.selected.includes(bracelet.id)}
                name={`bracelet-${bracelet.id}`}
                type="checkbox"
                onChange={(event)=>this.changeStateSelected(bracelet)}
                value={bracelet.id}
                label={bracelet.name}
                role="switch"
                className="form-check-input"
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
                <Container style={
                    {
                        marginBlock: "2.5rem",
                        width: "25%"
                    }
                }>
                    <Card title={this.state.fence.name}>
                        {this.state.bracelets.map(bracelet=>this.createBraceletRow(bracelet))}
                    </Card>
                </Container>

            </>
        );
    }
}

export default withRouter(FenceBraceletRegister);
