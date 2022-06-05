import React,{Component, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import NavBar from '../../components/Navbar';
import GoBack from '../../components/GoBack';
import {withRouter} from 'react-router-dom';
import {Wrapper, Status, } from "@googlemaps/react-wrapper";
import {Modal, Button} from "react-bootstrap";
class FenceCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            radius: 1,
            coordinates :{
                latitude: 0,
                longitude: 0
            },
            show: false
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
        await axios.post('http://localhost:8080/api/fences',
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                }
            }
        ).then(response => {
            console.log(response);
            this.props.history.push('/');
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
                                <Card title='Cadastro de Usuario'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event=>{
                                                    event.preventDefault();
                                                    this.create()}
                                                    }>
                                                    <fieldset>
                                                        <FormGroup label='Nome: *' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Nome da Cerca'
                                                                value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                                        </FormGroup>
                                                        <div className="beside flex"
                                                        >
                                                            <FormGroup label="Localização: " htmlFor="coordenada">
                                                                <Button name="coordenada" variant="info" onClick={this.showModal}>
                                                                    Selecionar Localização
                                                                </Button>
                                                                <Modal size="lg" fullscreen show={this.state.show} >
                                                                    <Modal.Header>
                                                                        <Modal.Title>Selecione a localização</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <GoogleMap/>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <Button variant="secondary" onClick={this.closeModal}> Fechar </Button>
                                                                        <Button variant="primary" onClick={this.closeModal}> Salvar Localização </Button>
                                                                    </Modal.Footer>
                                                                </Modal>
                                                            </FormGroup>
                                                            <div className="coordinates flex">
                                                                <FormGroup label="Latitude: " htmlFor="latitude">
                                                                    <input value={this.state.coordinates.latitude} type="text" className="form-control" id="latitude" disabled/>
                                                                </FormGroup>
                                                                <FormGroup label="Latitude: " htmlFor="latitude">
                                                                    <input value={this.state.coordinates.longitude} type="text" className="form-control" id="longitude" disabled/>
                                                                </FormGroup>
                                                                <FormGroup label='Raio: *' htmlFor='radius'>
                                                                    <input type='number' className='form-control' id='radius' min="1"
                                                                        placeholder='Raio da Cerca'
                                                                        value={this.state.radius} onChange={(e) => this.setState({ radius: e.target.value })} />
                                                                </FormGroup>
                                                            </div>
                                                            
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
      return <Map />;
  }
};
const google = window.google;
function GoogleMap() {
    return (
        <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY} render={render}/>
    )
}

function Map () {
    const ref = useRef();
    const [map, setMap] = useState();

    useEffect(() => {
        if(ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: { lat: -7.897789, lng: -37.118066 },
                zoom: 15
            }));
        }
    });
    if(map) {
        map.addListener("click", (event) => {
            console.log(`Latitude: ${event.latLng.lat()}\nLongitude: ${event.latLng.lng()}`);
        });
    }

    return (
        <div ref={ref} id="map"
            style={
                {
                    aspectRatio:"16/9"
                }
            }
        />
    )
}
const Marker = (options) => {
    const [marker, setMarker] = React.useState();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }
        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);
    return null;
};
