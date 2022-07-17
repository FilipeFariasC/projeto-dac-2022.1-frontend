import { Component, useEffect, useState } from "react";
import { Redirect, withRouter, Route } from "react-router";
import { LoginService } from "../services/LoginService";

//*
class AuthenticatedRoute extends Component{
    #loginService = new LoginService();

    constructor(props){
        super(props);
        this.state = {
            authenticated: false
        }
    }
    componentWillMount(){
        const fetch = async () => {
            const authenticated = await this.#loginService.isAuthenticated();
            this.setState({authenticated});
            return authenticated;
        }
        const authenticated = fetch()
            .then(response=>{
                this.setState({authenticated:response});
                return response;
            });
        this.setState({authenticated});
    }
    render(){
        return (<>
            <Route path={this.props.path} exact>
                {this.state.authenticated? this.props.children : <Redirect to="/login"/>}
            </Route>
            </>
        );
    }
}
//*/
/*
const AuthenticatedRoute = (props) => {
    const loginService = new LoginService();
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            const authenticated = loginService.isAuthenticated();
            setAuthenticated(authenticated);
        };
        fetchData();
    });
    return (
        <>
            <Route path={props.path} exact>
                {isAuthenticated ? props.children : <Redirect to="/login"/>}
            </Route>
        </>
    );
}
/*/
export default withRouter(AuthenticatedRoute);
