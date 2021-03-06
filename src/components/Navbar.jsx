import React, { useEffect, useState } from "react";
import {NavDropdown} from "react-bootstrap";
import {Link, useHistory, withRouter} from 'react-router-dom';
import NavItem from "./NavItem";
import "./css/Navbar.css"
import { LoginService } from "services/LoginService";


function Navbar() {
    const loginService = new LoginService();
    const history = useHistory();
    const [isAuthenticated,setAuthenticated] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            const authenticated = await loginService.isAuthenticated();
            setAuthenticated(authenticated);
        };
        fetchData();
    });
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container container-fluid">
                    <Link className="navbar-brand" to="/">
                        ChilDFence
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01"
                        aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <NavItem href="/" label="Home" />
                        {isAuthenticated &&
                        <>
                            <NavDropdown title="Pulseiras" id="bracelet-options" >
                                <Link className="dropdown-item" to="/bracelets/create"> Cadastrar Pulseira </Link>
                                <Link className="dropdown-item" to="/bracelets"> Listar Pulseira </Link>
                            </NavDropdown>
                            <NavDropdown title="Cercas" id="bracelet-options" >
                                <Link className="dropdown-item" to="/fences/create"> Cadastrar Cerca </Link>
                                <Link className="dropdown-item" to="/fences"> Listar Cerca </Link>
                            </NavDropdown>
                            <NavItem href="/profile" label="Perfil" />
                        </>
                        }

                        <NavDropdown title="Op????es" id="dropdown-options">
                            {isAuthenticated ?
                                <>
                                    <Link className="dropdown-item" to="/profile"> Perfil </Link>
                                    <NavDropdown.Divider />
                                    <button className="dropdown-item" onClick={()=>{
                                        loginService.logout();
                                        history.push("/login");
                                    }}>
                                        Logout
                                    </button>
                                </>
                                :
                                <>
                                    <Link className="dropdown-item" to="/users/create"> Cadastrar Usu??rio </Link>
                                    <Link className="dropdown-item" to="/login"> Login </Link>
                                </>
                            }
                            
                        </NavDropdown>
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default withRouter(Navbar);
