import { Component } from "react";
import { Link } from "react-router-dom";

export class FenceTable extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    createRow(fence){
        return(
            <tr>
                <td>{fence.name}</td>
                <td>
                    <Link className="btn btn-secondary" to={`/updateFence/${fence.id}`}>Editar</Link>
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
                    {this.props.fences.map(element => this.createRow(element))}
                </tbody>
            </table>
        );
    }

}
