import React, { Component, useState, useEffect, useRef } from 'react';
import Card from '../../../components/Card';
import FormGroup from '../../../components/FormGroup';
import NavBar from '../../../components/Navbar';
import GoBack from '../../../components/GoBack';
import { withRouter } from 'react-router-dom';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Modal, Button } from "react-bootstrap";
import FenceApiService from '../../../services/serviceSpecific/FenceApiService';
import { switchValidation } from '../../../services/ValidationService';
import { showErrorMessage, showSuccessMessage } from '../../../components/Toastr';
import { isAfter,isEqual } from 'date-fns';
import Navbar from '../../../components/Navbar';
import PaginaNaoEncontrada from 'components/PaginaNaoEncontrada';

var latitude = 0;
var longitude = 0;

class FenceUpdate extends React.Component {

    constructor() {
        super();
        this.service = new FenceApiService();
        this.state = {
            name: '',
            radius: 1,
            coordinate: {
                latitude: null,
                longitude: null
            },
            startTime: null,
            finishTime: null,
            tempCoordinates: {
                lat: 0,
                lng: 0
            },
            active: false,
            show: false,
            found: false
        }
    }


    closeModal = () => {
        this.setState({ show: false });
    }
    showModal = () => {
        this.setState({ show: true });
    }

    async componentDidMount() {
        await this.service.findById(this.props.match.params.id)
        .then(response => {
            const fence = response.data;
            this.setState({
                name: fence.name,
                radius: fence.radius,
                coordinate: {
                    latitude: fence.coordinate.latitude,
                    longitude: fence.coordinate.longitude
                },
                startTime: fence.startTime,
                finishTime: fence.finishTime,
                found: true
            });

        }).catch(error => {
            this.setState({found:false});
        })
    }

    validateCoordinate(){
        var latitudeElement = document.querySelector('#latitude');
        var longitudeElement = document.querySelector('#longitude');

        if(latitude >= -90 && latitude <= 90){
            switchValidation(latitudeElement, true);
        } else{
            switchValidation(latitudeElement, false);
        }
        if(longitude >= -180 && longitude <= 180){
            switchValidation(longitudeElement, true);
        } else{
            switchValidation(longitudeElement, false);
        }
    }

    getFence(){
        return {
            name: this.state.name,
            radius: this.state.radius && !isNaN(this.state.radius) ? this.state.radius : null,
            coordinate :{
                latitude: this.state.coordinate.latitude,
                longitude: this.state.coordinate.longitude
            },
            startTime: this.state.startTime,
            finishTime: this.state.finishTime
        }
    }

    update = async () => {
        await this.service.update(this.props.match.params.id, this.getFence() ).then(response => {
            showSuccessMessage('', 'Pulseira atualizada com sucesso!');
            this.props.history.push("/profile");
        }).catch(error => {
            error.response.data.errors.forEach(error => {showErrorMessage('', error.messageUser)});
        }
        );
    }

    validateTime(startTime, finishTime){
        if(!startTime && !finishTime) return;

        const startTimeElement = document.querySelector('#startTime');
        const finishTimeElement = document.querySelector('#finishTime');

        if(startTime){
            const startDate = this.getDate(startTime);
            if(finishTime){
                const finishDate = this.getDate(finishTime);

                if(isAfter(startDate, finishDate) || isEqual(startDate, finishDate)){
                    switchValidation(startTimeElement, false);
                    switchValidation(finishTimeElement, false);
                    return;
                }
            }
        }
        switchValidation(startTimeElement, true);
        switchValidation(finishTimeElement, true);
    }

    getDate(time){
        if(!time) return;

        var date = new Date()
        var[hour, minute] = time.split(':');
        date.setHours(hour);
        date.setMinutes(minute);

        return date;
    }

    render() {
        if(!this.state.found){
            return <>
                <Navbar />
                <PaginaNaoEncontrada/>
            </>;
        }

        return (
            <>
                <NavBar />
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 updateFence'
                            style={
                                {
                                    margin: "0 auto",
                                    paddingBlock: "2.5rem"
                                }
                            }
                        >
                            <div className='bs-docs-section'>
                                <Card title='Atualizar Cerca'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event => {
                                                    event.preventDefault();
                                                    this.update()
                                                }
                                                }
                                                >
                                                    <fieldset>
                                                        <FormGroup label='Nome: *' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Nome da Cerca'
                                                                value={this.state.name}
                                                                data-bs-toggle="tooltip" data-bs-placement="left"
                                                                title="Nome da pulseira entre 1 e 50 caracteres, todo caractere espaço de será substituído por espaço simples."
                                                                onChange={(e) =>{ 
                                                                        if(e.target.value.length >= 1 && e.target.value.length <= 50 && e.target.value.match(/.*\S.*/)){
                                                                            switchValidation(e.target, true);
                                                                        } else{
                                                                            switchValidation(e.target, false);
                                                                        }
                                                                        this.setState({ name: e.target.value });
                                                                    }
                                                                } />
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
                                                                        <GoogleMap coordinates={
                                                                            this.state.coordinate.latitude !== null && this.state.coordinate.longitude !== null ?
                                                                                {
                                                                                    latitude: this.state.coordinate.latitude,
                                                                                    longitude: this.state.coordinate.longitude
                                                                                }
                                                                                :
                                                                                null
                                                                        } name={this.state.name} radius={this.state.radius} />
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <Button variant="secondary" onClick={this.closeModal}> Fechar </Button>
                                                                        <Button variant="primary" onClick={() => {
                                                                            this.validateCoordinate();

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
                                                                    <input value={this.state.coordinate.latitude ? this.state.coordinate.latitude : null} type="text" className="form-control" id="latitude" disabled />
                                                                </FormGroup>
                                                                <FormGroup label="Latitude: " htmlFor="latitude">
                                                                    <input value={this.state.coordinate.longitude ? this.state.coordinate.longitude : null} type="text" className="form-control" id="longitude" disabled />
                                                                </FormGroup>
                                                                <FormGroup label='Raio: *' htmlFor='radius'>
                                                                    <input type='number' className='form-control' id='radius' min="1"
                                                                        placeholder='Raio da Cerca'
                                                                        value={this.state.radius} onChange={(e) =>{
                                                                                if(e.target.value >= 1){
                                                                                    switchValidation(e.target, true);
                                                                                } else{
                                                                                    switchValidation(e.target, false);
                                                                                }
                                                                                this.setState({ radius: parseInt(e.target.value) });
                                                                            }
                                                                        } 
                                                                    />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div className="flex times">
                                                            <FormGroup label="Horário Inicial: " htmlFor="startTime">
                                                                <input type="time" className="form-control" id="startTime"
                                                                    value={this.state.startTime} onChange={(e) =>{
                                                                        this.validateTime(e.target.value, this.state.finishTime);
                                                                        this.setState({ startTime: e.target.value });
                                                                    }
                                                                }
                                                                />
                                                            </FormGroup>
                                                            <FormGroup label="Horário Final: " htmlFor="finishTime">
                                                                <input type="time" className="form-control" id="finishTime"
                                                                    value={this.state.finishTime} onChange={(e) =>{
                                                                        this.validateTime(this.state.startTime, e.target.value);
                                                                        
                                                                        this.setState({ finishTime: e.target.value });
                                                                    }
                                                                }
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
                                                            <GoBack />
                                                            <button type="submit" className='btn btn-success'>Atualizar</button>
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

    useEffect(() => {
        if (map) {
            map.addListener("click", (event) => {
                if (newMarker == null) {
                    newMarker = new window.google.maps.Marker({
                        position: event.latLng,
                        map: map,
                        title: "Localização Selecionada",
                        label: props.name
                    });
                } else {
                    newMarker.setOptions({
                        position: event.latLng,
                    });
                }

                latitude = event.latLng.lat();
                longitude = event.latLng.lng();

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

export default withRouter(FenceUpdate);
