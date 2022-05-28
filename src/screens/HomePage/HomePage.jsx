import React, {Component} from "react";
import Navbar from "../../components/Navbar";
import {withRouter} from "react-router-dom";
import "./css/HomePage.css"

class HomePage extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 brand-text">
                            <h1 className="title">ChilDFence</h1>
                            <blockquote>
                                O lugar certo para a sua criança.
                            </blockquote>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(HomePage);