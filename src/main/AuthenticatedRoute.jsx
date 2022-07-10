import { Component } from "react";
import { Redirect, withRouter, Route } from "react-router";
import { isAuthenticated, LoginService } from "../services/LoginService";


class AuthenticatedRoute extends Component{
    #loginService = new LoginService();

    constructor(props){
        super(props);
    }

    render(){
        return (<>
            <Route path={this.props.path} exact>
                {this.#loginService.isAuthenticated()? this.props.children : <Redirect to="/login"/>}
            </Route>
            </>
        );
    }
}

export default withRouter(AuthenticatedRoute);
