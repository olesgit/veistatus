import React, { Component, PropTypes } from 'react';
import { FormGroup } from 'react-bootstrap';
import GeoAutoComplete from './Inputs/geoAutoComplete';
import '../css/Sider/Adresse.css';

class AddressInput extends Component {

    static propTypes = {
        geodata: PropTypes.object,
        locationSeleted: PropTypes.func
    }

    selectSuggestion = (data) => {
        var service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({
            placeId: data.place_id
        }, (place, status) => this.callback(place, status, data)
        );
    }

    callback = (place, status, data) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            var lat = place.geometry.location.lat();
            var lon = place.geometry.location.lng();
            const geodata = {
                adressSelectedBy: 'text',
                lat: lat,
                lon: lon,
                valgtZoom: 18,
                display_name: data.adresse,
                id: data.id,
                centerlat: lat,
                centerlon: lon
            };
            this.selectCoord(geodata);
        }
        else {
            console.log("Error: lookup on places returns: ", status);
        }
    }

    selectCoord = (data) => {
        if (data.adressSelectedBy && this.props.locationSeleted) {
            this.props.locationSeleted(data);
        }
    }

    render() {
        return (
            <FormGroup>
                <GeoAutoComplete
                    id="Adresse-Input"
                    marginTop={{ 'marginTop': '10px' }}
                    onSelectAddress={this.selectCoord}
                    selectSuggestion={this.selectSuggestion}
                    geodata={this.props.geodata}
                    Height={{ 'height': '50px' }}
                />
            </FormGroup>
        );
    }
}

export default AddressInput;