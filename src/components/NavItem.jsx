import React from "react";
import {NavLink} from "react-router-dom";

function NavItem(props){
    return(
        <li className="nav-item">
            <NavLink className="nav-link" to={props.href}> {props.label}</NavLink>
            {props.children}
        </li>
    )
}

export default NavItem;