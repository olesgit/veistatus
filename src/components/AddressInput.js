import React, { Component, PropTypes } from 'react';
import { InputGroup, Button, Image } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';

import './AddressInput.css';

import clearIcon from '../images/clear.svg'
import searchIcon from '../images/clear.svg'

const DEFAULT_ZOOM = 18;
const OSLO_BOX_SW = new window.google.maps.LatLng(59.7868158061153, 10.49674987792969);
const OSLO_BOX_NE = new window.google.maps.LatLng(60.141504734793386, 10.967788696289064);
const OSLO_BOX = new window.google.maps.LatLngBounds(OSLO_BOX_SW, OSLO_BOX_NE);

function createGeodata(id, name, lat, lon) {
    return {
        display_name: name,
        lat: lat,
        lon: lon,
        valgtzoom: DEFAULT_ZOOM,
        adressSelectedBy: 'search',
        id: id,
        centerlat: lat,
        centerlon: lon
    }
}

class AddressInput extends Component {

    static propTypes = {
        showClear: PropTypes.bool,
        showSearch: PropTypes.bool,
        geodata: PropTypes.object,
        locationSeleted: PropTypes.func
    }

    static defaultProps = {
        showClear: false,
        showSearch: false
    }

    onSuggestSelect = (suggest) => {
        this.props.locationSeleted(createGeodata(suggest.placeId, suggest.label, suggest.location.lat, suggest.location.lng));
    }

    onClear = () => {
        this.geoSuggest.clear();
        this.props.locationSeleted(null);
    }

    onSearch = () => {
        this.geoSuggest.searchSuggests();
    }

    shouldSkipSuggest = (suggest) => {
        // Last two terms should be 'Oslo' and 'Norway'
        const count = suggest.terms.length;
        return count < 2 ||
            suggest.terms[count - 1].value !== "Norway" ||
            suggest.terms[count - 2].value !== "Oslo";
    }

    getSuggestLabel = (suggest) => {
        return suggest.terms
            .slice(0, suggest.terms.length - 2)
            .map(term => term.value)
            .join(', ');
    }

    render() {

        const { geodata, showClear, showSearch } = this.props;
        const text = geodata ? geodata.display_name : '';

        return (
            <InputGroup className="address-input-group">
                <Geosuggest
                    className="address-input-container"
                    inputClassName="address-input"
                    suggestsClassName="address-input-suggestions-container"
                    suggestsHiddenClassName="address-input-hidden"
                    suggestItemClassName="address-input-suggestion"
                    suggestItemActiveClassName="address-input-active"
                    ref={g => this.geoSuggest = g}
                    placeholder="Søk etter adresse eller klikk i kart"
                    initialValue={text}
                    country="no"
                    onSuggestSelect={this.onSuggestSelect}
                    bounds={OSLO_BOX}
                    autoActivateFirstSuggest={true}
                    skipSuggest={this.shouldSkipSuggest}
                    types={['geocode', 'establishment']}
                    getSuggestLabel={this.getSuggestLabel}
                />

                <InputGroup.Button>
                    {showSearch &&
                        <Button bsStyle="input-group" onClick={this.onSearch}>
                            <Image src={searchIcon} alt="søk knapp" />
                        </Button>
                    }
                    {showClear &&
                        <Button bsStyle="input-group" onClick={this.onClear}>
                            <Image src={clearIcon} alt="tøm tekst" />
                        </Button>
                    }
                </InputGroup.Button>
            </InputGroup>
        );
    }
}

export default AddressInput;


    // onSuggestSelect = (data) => {
    //     var service = new window.google.maps.places.PlacesService(document.createElement('div'));
    //     service.getDetails({
    //         placeId: data.placeId
    //     }, (place, status) => this.callback(place, status, data)
    //     );
    // }

    // callback = (place, status, data) => {
    //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    //         var lat = place.geometry.location.lat();
    //         var lon = place.geometry.location.lng();
    //         const geodata = {
    //             adressSelectedBy: 'text',
    //             lat: lat,
    //             lon: lon,
    //             valgtZoom: 18,
    //             display_name: data.adresse,
    //             id: data.id,
    //             centerlat: lat,
    //             centerlon: lon
    //         };
    //         if (geodata.adressSelectedBy && this.props.locationSeleted) {
    //             //this.props.locationSeleted(geodata);
    //         }
    //     }
    //     else {
    //         console.log("Error: lookup on places returns: ", status);
    //     }
    // }