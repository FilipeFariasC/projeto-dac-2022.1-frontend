import React, {Component} from "react";
import Navbar from "../../components/Navbar";


export default class UserProfile extends Component {

    constructor(props) {
        super(props);
            this.state = {
                user: {
                name: '',
                email: ''
            }
        }
    }

    render(){
        return (
            <>
                <Navbar/>
                <div>
                    <h1>User Profile</h1>
                    <p>Name: {this.state.user.name}</p>
                    <p>Email: {this.state.user.email}</p>
                </div>
            </>
        );
    }
}