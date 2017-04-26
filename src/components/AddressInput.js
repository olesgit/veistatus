import React, { Component, PropTypes } from 'react';
import { InputGroup, Button, Image } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';

import './AddressInput.css';

import clearIcon from '../images/clear.svg'
import searchIcon from '../images/sok.svg'

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
        this.geoSuggest.blur();
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
        // Note: need this check because of a bug in geosuggest 
        // where country code is not sent to google
        const count = suggest.terms.length;
        return count <= 2 ||
            suggest.terms[count - 2].value !== "Oslo" ||
            !(suggest.terms[count - 1].value === "Norway" ||
                suggest.terms[count - 1].value === "Norge");
    }

    getSuggestLabel = (suggest) => {
        return suggest.structured_formatting.main_text;
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
                    queryDelay={0}
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