import React, { Component, PropTypes } from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';

import './AddressInput.css';

// Polyfill in order to support IE (geosuggest dependency)
if (!Array.find) {
    require('core-js/fn/array/find');
}

const DEFAULT_ZOOM = 18;
const OSLO_BOX_SW = new window.google.maps.LatLng(59.7868158061153, 10.49674987792969);
const OSLO_BOX_NE = new window.google.maps.LatLng(60.141504734793386, 10.967788696289064);
const OSLO_BOX = new window.google.maps.LatLngBounds(OSLO_BOX_SW, OSLO_BOX_NE);

function createGeodata(id, name, lat, lon) {
    return {
        display_name: name,
        lat: lat,
        lon: lon,
        valgtZoom: DEFAULT_ZOOM,
        adressSelectedBy: 'search',
        id: id
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
        if (this.geoSuggest) {
            this.geoSuggest.blur();
        }
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
                    placeholder="Søk etter adresse"
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
                        <Button id="address-search-icon" bsStyle="input-group" onClick={this.onSearch}>
                        </Button>
                    }
                    {showClear &&
                        <Button id="address-clear-icon" bsStyle="input-group" onClick={this.onClear}>
                        </Button>
                    }
                </InputGroup.Button>
            </InputGroup>
        );
    }
}

export default AddressInput;