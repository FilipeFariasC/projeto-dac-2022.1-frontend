import React from "react";
import {NavDropdown} from "react-bootstrap";
import {Link} from 'react-router-dom';

import NavItem from "./NavItem";
import "./css/Navbar.css"


function Navbar(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container container-fluid">
                    <Link className="navbar-brand" href="/">
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
                        <NavItem href="/" label="Cercas" />
                        <NavDropdown title="Opções" id="dropdown-options">
                            <NavDropdown.Item href="/createUser">
                                Cadastrar Usuário
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/profile"> Perfil </NavDropdown.Item>
                            <NavDropdown.Item href="/createBracelet"> Cadastrar Pulseira </NavDropdown.Item>
                        </NavDropdown>
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
