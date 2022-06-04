/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default props => {

    const rows = props.bracelets.map(bracelet => {
        <tr className="table-primary" key={bracelet.id}>
            <th scope="row">{bracelet.id}</th>
            <td>{bracelet.name}</td>
            <td>{bracelet.fences}</td>
            <td>{bracelet.locations}</td>
            <td>{bracelet.monitor}</td>
            <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" 
                        onClick={e => props.edit(bracelet.id)}>edit</button>
                        <button type="button" className="btn btn-secondary"
                        onClick={e => props.delete(bracelet.id)}>delete</button>
                    </div>
                </td>
        </tr>
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Fences</th>
                    <th scope="col">Locatios</th>
                    <th scope="col">Monitor</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}