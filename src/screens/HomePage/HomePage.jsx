import React, {Component} from "react";
import Navbar from "../../components/Navbar";
import {withRouter} from "react-router-dom";

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
                        <div className="col-md-6 brand-text"
                            style={
                                {
                                    paddingBlock: "2.5rem",
                                    margin: "0 auto",
                                    textAlign: "center"
                                }
                            }
                        >
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
