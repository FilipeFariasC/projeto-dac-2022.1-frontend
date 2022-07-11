import { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./ListTable.css"

export class ListTable extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    createRow(element){
        return(
            <tr key={element.id}>
                <td>
                    <Link className="text-reset text-decoration-none" to={`/${this.props.entity}/${element.id}`}>{element.name}</Link>
                </td>
                <td>
                    <div className="btn-group" role="group" aria-label="Basic example"
                        style={
                            {
                                display: "flex",
                            }
                        }>
                        <Link className="btn btn-secondary" to={`/${this.props.entity}/update/${element.id}`}>Editar</Link>
                        <a type="button" className="btn btn-danger" href="#">Excluir</a>
                    </div>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover table-info" style={
                {
                    tableLayout: 'fixed',
                    marginBlock: "1rem"
                }
            }>
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {this.props.data.map(element => this.createRow(element))}
                </tbody>
            </table>
        );
    }

}
