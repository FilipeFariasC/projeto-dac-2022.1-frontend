import React,{Component, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
import GoBack from '../../components/GoBack';
import {withRouter} from 'react-router-dom';
import {Wrapper, Status } from "@googlemaps/react-wrapper";
import {Modal, Button} from "react-bootstrap";
import FenceApiService from '../../services/serviceSpecific/FenceApiService';

var latitude = 0;
var longitude = 0;

class FenceCreate extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            radius: 1,
            coordinate :{
                latitude: 0,
                longitude: 0
            },
            startTime: null,
            finishTime: null,
            tempCoordinates:{
                lat: 0,
                lng: 0
            },
            show: false
        }
        this.service = new FenceApiService();

    }

    getFence(){
        console.log(this.state.name);
        return {
            name: this.state.name,
            radius: this.state.radius,
            coordinate :{
                latitude: this.state.coordinate.latitude,
                longitude: this.state.coordinate.longitude
            },
            startTime: this.state.startTime,
            finishTime: this.state.finishTime
        }
    }

    closeModal = () => {
        this.setState({show: false});
    }
    showModal = () => {
        this.setState({show: true});
    }

    async create() {
        console.log("Criando");
        const fence = this.getFence();
        console.log(fence);
        await this.service.create(fence,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                }
            }
        ).then(response => {
            console.log(response);
            this.props.history.push('/profile');
        }
        ).catch(error => {
            console.log(error);
        }
        );
        console.log("Finalizado");
    }


    render() {
        return (
            <>
                <NavBar/>
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 userRegister'
                            style={
                                {
                                    margin: "0 auto",
                                    paddingBlock: "2.5rem"
                                }
                            }
                        >
                            <div className='bs-docs-section'>
                                <Card title='Cadastro de Cerca'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event=>{
                                                            event.preventDefault();
                                                            this.create()
                                                        }
                                                    }
                                                >
                                                    <fieldset>
                                                        <FormGroup label='Nome: *' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Nome da Cerca'
                                                                value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                                        </FormGroup>
                                                        <div className="beside flex"
                                                        >
                                                            <FormGroup label="Localização: " htmlFor="coordenada">
                                                                <Button name="coordenada" variant="info" onClick={this.showModal}
                                                                    style={
                                                                        {
                                                                            whiteSpace: "nowrap",
                                                                        }
                                                                    }
                                                                >
                                                                    Selecionar Localização
                                                                </Button>
                                                                <Modal size="lg" fullscreen show={this.state.show} >
                                                                    <Modal.Header>
                                                                        <Modal.Title>Selecione a localização | RAIO: {this.state.radius}</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <GoogleMap name={this.state.name} radius={this.state.radius}/>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <Button variant="secondary" onClick={this.closeModal}> Fechar </Button>
                                                                        <Button variant="primary" onClick={()=>{
                                                                            this.setState({
                                                                                coordinate: {
                                                                                    latitude,
                                                                                    longitude
                                                                                }
                                                                            });
                                                                            this.closeModal();
                                                                        }}> Salvar Localização </Button>
                                                                    </Modal.Footer>
                                                                </Modal>
                                                            </FormGroup>
                                                            <div className="coordinates flex">
                                                                <FormGroup label="Latitude: " htmlFor="latitude">
                                                                    <input value={this.state.coordinate.latitude} type="text" className="form-control" id="latitude" disabled/>
                                                                </FormGroup>
                                                                <FormGroup label="Latitude: " htmlFor="latitude">
                                                                    <input value={this.state.coordinate.longitude} type="text" className="form-control" id="longitude" disabled/>
                                                                </FormGroup>
                                                                <FormGroup label='Raio: *' htmlFor='radius'>
                                                                    <input type='number' className='form-control' id='radius' min="1"
                                                                        placeholder='Raio da Cerca'
                                                                        value={this.state.radius} onChange={(e) => this.setState({radius: parseInt(e.target.value)})} />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div className="flex times">
                                                            <FormGroup label="Horário Inicial: " htmlFor="startTime">
                                                                <input type="time" className="form-control" id="startTime" 
                                                                    value={this.state.startTime} onChange={(e) => this.setState({ startTime: e.target.value })} 
                                                                />
                                                            </FormGroup>
                                                            <FormGroup label="Horário Final: " htmlFor="finishTime">
                                                                <input type="time" className="form-control" id="finishTime" 
                                                                    value={this.state.finishTime} onChange={(e) => this.setState({ finishTime: e.target.value })} 
                                                                />
                                                            </FormGroup>
                                                        </div>
                                                        <br />
                                                        <div className="buttons-wrapper"
                                                            style={
                                                                {
                                                                    display: "flex",
                                                                    justifyContent: "space-between"
                                                                }
                                                            }
                                                        >
                                                            <GoBack/>
                                                            <button type="submit" className='btn btn-success'>Cadastrar</button>
                                                        </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(FenceCreate);

const render = (status) => {
    switch (status) {
        case Status.LOADING:
            return <h2>CARREGANDO</h2>;
        case Status.FAILURE:
            return <h2>FALHA</h2>;
        case Status.SUCCESS:
            return (
                <Map/>
            );
    };
};
const google = window.google;
function GoogleMap(props) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <Map name={props.name} radius={props.radius} />
        </Wrapper>
    )
}

function Map (props) {
    const ref = useRef();
    const [map, setMap] = useState();
    const [marker, setMarker] = useState();

    let newMarker = null;
    let newCircle = null;

    useEffect(() => {
        if(ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: { lat: -7.897789, lng: -37.118066 },
                zoom: 15
            }));
        }
    }, [ref, map]);

    useEffect(() => {
        if(map){
            map.addListener("click", (event) => {
                console.log(`Latitude: ${event.latLng.lat()}\nLongitude: ${event.latLng.lng()}`);

                if(newMarker == null){
                    newMarker = new window.google.maps.Marker({
                        position: event.latLng,
                        map: map,
                        title: "Localização Selecionada",
                        label: props.name
                    });
                }else{
                    newMarker.setOptions({
                        position: event.latLng,
                    });
                }

                latitude = event.latLng.lat();
                longitude = event.latLng.lng();

                console.log(latitude, longitude);

                var radius = props.radius;

                newCircle = new window.google.maps.Circle({
                    map: map,
                    radius,
                    fillColor: '#00ff00'
                });
                newCircle.bindTo('center', newMarker, 'position');
                
                setMarker(newMarker);
            });
        }
    }, [map]);

    return (
        <div ref={ref} id="map"
            style={
                {
                    width: "100%",
                    height: "100%"
                }
            }
        >
            
        </div>
    )
}

