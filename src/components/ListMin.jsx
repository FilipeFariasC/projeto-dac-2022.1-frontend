const { Component } = require("react");
const { Link, withRouter } = require("react-router-dom");


export class ListMin extends Component {

    constructor(props) {
        super(props);
    }

    createRow(row) {
        return (
            <li key={row.id} className="list-group-item flex dataRowOptions"
                style={
                    {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }
                }
            >
                <strong className="fenceName"
                    style={
                        {
                            fontSize: "0.75rem",
                            whiteSpace: "nowrap"
                        }
                    }
                >
                    <Link className="text-reset text-decoration-none" to={`${this.props.list}/${row.id}`}>
                        {row.name}
                    </Link>
                </strong>
                <Link className="btn btn-primary" to={`${this.props.list}/update/${row.id}`}>
                    Editar
                </Link>
                <button className="btn btn-danger"
                    onClick={e => this.props.service.delete(`${row.id}`)}>
                    Excluir
                </button>

            </li>
        );
    }
    dataList() {
        return this.props.data.map(element => this.createRow(element));
    }

    Delete = (props) => {
        //this.props.deletedeleteBracelet(id)
        props.delete(this.props.match.params.id)
            .then(response => {
                console.log(response);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }


    render() {
        if (this.props.data.length === 0) {
            return (
                <div className="flex">
                    <Link className="btn btn-primary" to={`${this.props.list}/create`}
                        style={
                            {
                                width: "100%"
                            }
                        }
                    >Cadastrar Cerca </Link>
                </div>
            );
        }

        return (
            <>
                <ul className="list-group">
                    {this.dataList()}

                    <li key={-1} className={`list-group-item flex dataRowOptions`}
                        style={
                            {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                            }
                        }
                    >
                        <Link className="btn btn-info" to={`${this.props.list}`}> {this.props.entity} </Link>
                    </li>
                </ul>
            </>
        );
    }
}

export default withRouter(ListMin);
