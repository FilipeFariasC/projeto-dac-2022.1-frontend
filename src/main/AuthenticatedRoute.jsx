import { Component } from "react";
import { Redirect, withRouter, Route } from "react-router";
import { isAuthenticated } from "../services/LoginService";


class AuthenticatedRoute extends Component{

    render(){
        return (<>
            <Route path={this.props.path} exact>
                {isAuthenticated()? this.props.children : <Redirect to="/login"/>}
            </Route>
            </>
        );
    }
}

export default withRouter(AuthenticatedRoute);
