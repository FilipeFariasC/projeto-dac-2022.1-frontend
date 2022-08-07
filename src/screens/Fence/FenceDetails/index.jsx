import React, { Component, useState, useEffect, useRef } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Navbar from "../../../components/Navbar";
import Card from "../../../components/Card";
import GoBack from "components/GoBack";
import ListMin from "components/ListMin";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { FormCheck, Button } from "react-bootstrap";
import FenceApiService from "../../../services/serviceSpecific/FenceApiService";
=======
import { Modal, Button } from "react-bootstrap";
import {FenceApiService} from "services";
>>>>>>> af79523e2a56d7de1e66a910e2d3b99682829473
import PaginaNaoEncontrada from 'components/PaginaNaoEncontrada';
//import BraceletProfile from '../../Bracelet/BraceletProfile/BraceletProfile';

var latitude = 0;
var longitude = 0;

class FenceDetails extends Component {

    constructor(props) {
        super(props);
        this.service = new FenceApiService();
        this.state = {
            fence: {
                id: 0,
                name: '',
                coordinate: {
                    latitude: null,
                    longitude: null
                },
                startTime: null,
                finishTime: null,
                active: false,
                radius: 1,
                bracelets: [],
                tempCoordinates: {
                    lat: 0,
                    lng: 0
                },
                show: false,
            },
            found: false
        }
    }

    async componentDidMount() {
        await this.service.findById(this.props.match.params.id)
            .then(response => {
                this.setState({
                    fence: response.data,
                    found: true
                })
            })
            .catch(() => {
                this.setState({ found: false });
            });
    }

    getFence() {
        return {
            fence: {
                id: this.state.fence.id,
                name: this.state.fence.name,
                coordinate: {
                    latitude: this.state.fence.coordinate.latitude,
                    longitude: this.state.fence.coordinate.longitude
                },
                startTime: this.state.fence.startTime,
                finishTime: this.state.fence.finishTime,
                active: this.state.fence.active,
                radius: this.state.fence.radius,
                bracelets: this.state.fence.bracelets
            }
        }
    }

    async status() {
        await this.service.statusActive(
            this.props.match.params.id,
            this.getFence())
            .then(response => {
                this.setState({
                    fence: response.data,
                    found: true
                })
            })
            .catch(() => {
                this.setState({ found: false });
            }
        );


    }

    closeModal = () => {
        this.setState({ show: false });
    }
    showModal = () => {
        this.setState({ show: true });
    }

    render() {
        if (!this.state.found) {
            return <>
                <Navbar />
                <PaginaNaoEncontrada />
            </>;
        }
        return (
            <>
                <Navbar />
                <div className="container container-fluid flex profile-wrapper"
                    style={
                        {
                            width: "100%",
                            paddingBlock: "2.5rem",
                            alignItems: "flex-start",
                            flexGrow: "1",
                            flexBasis: "1",
                            flexShrink: "0"
                        }
                    }
                >
                    <Card className="fence-profile" title="Detalhes da Cerca">
                        <table className="table table-primary table-hover user-info"
                            style={
                                {
                                    width: "100%"
                                }
                            }
                        >
                            <thead className="table-header table-primary"
                                style={
                                    {
                                        textAlign: "center"
                                    }
                                }
                            >
                                <tr>
                                    <td colSpan="2">
                                        <h5>Informações</h5>
                                    </td>
                                </tr>
                            </thead>
                            <tbody className="table-info">
                                <tr>
                                    <td>
                                        Nome:
                                    </td>
                                    <td>
                                        {this.state.fence.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Localização:
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-info"
                                            onClick={this.showModal}>Mostrar Localização</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Horário Inicial:
                                    </td>
                                    <td>
                                        {this.state.fence.startTime}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Horário Final:
                                    </td>
                                    <td>
                                        {this.state.fence.finishTime}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Status:
                                    </td>
                                    <td>
                                        <form onSubmit={event => {
                                            event.preventDefault();


                                        }
                                        }
                                        >
                                            <fieldset className="form-group">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input"
                                                        type="checkbox"
                                                        id="flexSwitchCheckDefault"
                                                        value={this.state.fence.active}
                                                        onChange={() => this.status()}
                                                        role="switch"
                                                    />
                                                    <label className="form-check-label" forhtml="flexSwitchCheckDefault"></label>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Raio:
                                    </td>
                                    <td>
                                        {this.state.fence.radius}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex"
                            style={
                                {
                                    justifyContent: "space-between"
                                }
                            }
                        >
                            <GoBack />
                            <Link to={`/fences/update/${this.props.match.params.id}`} className="btn btn-primary">Editar</Link>
                            <Link to={`${this.props.location.pathname}/bracelets`} className="btn btn-info"> Pulseiras </Link>
                        </div>
                    </Card>
                    <Card title="Pulseiras">
                        <div className="bracelet profiles flex"
                            style={
                                {
                                    flexDirection: "column"
                                }
                            }
                        >
                            <div className="bracelet-profile">
                                <h4>Pulseiras</h4>
                                <ListMin
                                    data={this.state.fence.bracelets}
                                    entity="Pulseiras"
                                    list="/bracelets"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="container container-fluid flex profile-wrapper"
                    tyle={
                        {
                            width: "100%",
                            paddingBlock: "2.5rem",
                            alignItems: "flex-start",
                            flexGrow: "1",
                            flexBasis: "1",
                            flexShrink: "0"
                        }
                    }
                >
                    <Card title="Localização no mapa" >
                        <div className="localization" tyle={
                            {
                                width: '50%',
                                height: '60vh'
                            }
                        } >
                            <GoogleMap coordinates={
                                this.state.fence.coordinate.latitude !== null && this.state.fence.coordinate.longitude !== null ?
                                    {
                                        latitude: this.state.fence.coordinate.latitude,
                                        longitude: this.state.fence.coordinate.longitude
                                    }
                                    :
                                    null
                            } name={this.state.fence.name} radius={this.state.fence.radius} />
                        </div>
                    </Card>
                </div>
            </>
        );
    }
}



const google = window.google;
function GoogleMap(props) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <Map coordinates={props.coordinates} name={props.name} radius={props.radius} />
        </Wrapper>
    )
}

function Map(props) {
    const ref = useRef();
    const [map, setMap] = useState();
    const [marker, setMarker] = useState();

    let newMarker = null;
    let newCircle = null;
    var radius = props.radius;

    useEffect(() => {
        let options = null;
        if (props.coordinates) {
            options = {
                center: { lat: props.coordinates.latitude, lng: props.coordinates.longitude },
                zoom: 15
            };
            newMarker = new window.google.maps.Marker({
                position: {
                    lat: props.coordinates.latitude,
                    lng: props.coordinates.longitude
                },
                map: map,
                title: "Localização Selecionada",
                label: props.name
            });
            newCircle = new window.google.maps.Circle({
                map: map,
                radius,
                fillColor: '#00ff00'
            });
            newCircle.bindTo('center', newMarker, 'position');
        } else {
            options = {
                center: { lat: -7.897789, lng: -37.118066 },
                zoom: 15
            }
        }

        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, options));
        }
    }, [ref, map]);

    return (
        <div ref={ref} id="map"
            style={
                {
                    width: "60%",
                    height: "60%"
                }
            }
        >

        </div>
    )
}

export default withRouter(FenceDetails);