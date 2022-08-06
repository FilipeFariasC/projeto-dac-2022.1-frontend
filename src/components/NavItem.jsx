import React from "react";
import {NavLink} from "react-router-dom";

function NavItem({render, ...props}){
    if(!render){return false;}
    return(
        <li className="nav-item">
            <NavLink className={props.className? props.className : "nav-link"} onClick={props.onClick} to={props.href}> {props.label}</NavLink>
            {props.children}
        </li>
    )
}

export default NavItem;