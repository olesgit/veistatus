import React, { Component, PropTypes } from 'react'
import AddressInput from '../AddressInput'

import './MapSearch.css'

class MapSearch extends Component {

    static propTypes = {
        showSearch: PropTypes.bool,
        geodata: PropTypes.object,
        locationSeleted: PropTypes.func
    }

    static defaultProps = {
        showSearch: true
    }

    render() {
        const { showSearch, geodata } = this.props;

        if (!showSearch) {
            return null;
        }

        return (
            <div className="map-search">
                <div className="map-search-content">
                    <AddressInput geodata={geodata} locationSeleted={this.props.locationSeleted} showSearch={true} />
                </div>
            </div>
        );
    }
}

export default MapSearch