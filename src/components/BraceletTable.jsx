/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import { Link } from "react-router-dom";


export class BraceletTable extends Component{
    constructor(props){
        super();
        this.props = props;
    }

    createRow(bracelet){
        return(
            <tr>
                <td>{bracelet.name}</td>
                <td>
                    <Link className="btn btn-secondary" to={`/updateBracelet/${bracelet.id}`}>Editar</Link>
                    <a type="button" className="btn btn-danger" href="#">Excluir</a>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.bracelets}
                </tbody>
            </table>
        );
    }
}
