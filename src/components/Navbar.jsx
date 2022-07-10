import React from "react";
import {NavDropdown} from "react-bootstrap";
import {Link, useHistory} from 'react-router-dom';
import NavItem from "./NavItem";
import "./css/Navbar.css"
import { LoginService } from "services/LoginService";
import { withRouter } from "react-router-dom";


function Navbar(props) {
    const loginService = new LoginService();
    const history = useHistory();

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
<<<<<<< HEAD
                        <NavDropdown title="Pulseiras" id="bracelet-options" >
                            <NavDropdown.Item href="/createBracelet">
                                Cadastrar Pulseira
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/bracelets">
                                Listar Pulseira
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/braceletProfile">
                                Perfil Pulseira
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Cercas" id="bracelet-options" >
                            <NavDropdown.Item href="/createFence">
                                Cadastrar Cerca
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/fences">
                                Listar Cercas
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/fenceProfile">
                                Perfil Cerca
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavItem href="/profile" label="Perfil" />
=======
                        {loginService.isAuthenticated() &&
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
>>>>>>> 17200d9292f7fe71504bef2e3e04cff967010965
                        <NavDropdown title="Opções" id="dropdown-options">
                            {loginService.isAuthenticated() ?
                                <>
                                    <Link className="dropdown-item" to="/profile"> Perfil </Link>
                                    <NavDropdown.Divider />
                                    <button className="dropdown-item" onClick={(event)=>{
                                        loginService.logout();
                                        history.push("/login");
                                    }}>
                                        Logout
                                    </button>
                                </>
                                :
                                <>
                                    <Link className="dropdown-item" to="/users/create"> Cadastrar Usuário </Link>
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
