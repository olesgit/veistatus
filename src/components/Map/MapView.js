import React, { PropTypes } from 'react'
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
//import MarkerClusterGroup from 'react-leaflet-markercluster'
import { /*divIcon,*/ icon } from 'leaflet'
import { startLat, startLon, startZoom } from "../../constants/settings"
import '../../css/kart/kart.css'
import OpenMarker from './OpenMarker'

const nominatim = require('./Nominatim')

// const markers = [
//     { lat: 59.9412, lng: 10.77 },
//     { lat: 59.9445, lng: 10.77 },
//     { lat: 59.9467, lng: 10.77 }
// ];

import './MapView.css'

// const icon1 = divIcon({className: 'leaflet-div-icon2'});  //built in red circle

var icon2 = icon({
    iconUrl: 'map-pin.png',
    //shadowUrl: 'marker-white.png',
    iconSize: [24, 30], // size of the icon
    //shadowSize:   [24, 30], // size of the shadow
    iconAnchor: [12, 30], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [0, -33] // point from which the popup should open relative to the iconAnchor
});

//TileLayer settings:
//orginal sample:
// url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// as from barnehager i oslo, med mapbox style:
// L.tileLayer('https://api.mapbox.com/styles/v1/webforvaltningen/cirlr93tl0010gyly7o56ugi3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2ViZm9ydmFsdG5pbmdlbiIsImEiOiJjaXJsczQ5dnAwMDMxaG5rd2xnNGt2MGZvIn0.BGtT-dezZ_5hseqXmkMAoQ', {
//         attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//         maxZoom: 18,
//         minZoom: 7,
//         detectRetina: true

function removePart(name, part) {
    if (!part) return name;
    let index = name.lastIndexOf(", " + part);
    if (index !== -1) return name.substring(0, index);
    index = name.lastIndexOf(part + ", ");
    if (index === 0) return name.substring(part.length + 2);
    index = name.lastIndexOf(part);
    if (index === 0) return name.substring(part.length);
    return name;

}

function formatAddress(name, address) {
    name = removePart(name, address.country);
    name = removePart(name, address.postcode);
    name = removePart(name, address.state);
    name = removePart(name, address.suburb);
    name = removePart(name, address.city_district);
    name = removePart(name, address.neighbourhood);
    name = removePart(name, address.hotel);
    name = removePart(name, address.bicycle_parking);
    name = removePart(name, address.restaurant);
    name = removePart(name, address.convenience);
    if (address.house_number && address.road) {
        name = name.replace(`${address.house_number}, ${address.road}`, `${address.road} ${address.house_number}`);
    } else if (address.house_number && address.pedestrian) {
        name = name.replace(`${address.house_number}, ${address.pedestrian}`, `${address.pedestrian} ${address.house_number}`);
    }

    return name;
}

function formatAddress_new(name, address) {
    if (address.house_number && address.road) {
        return `${address.road} ${address.house_number}`;
    } else if (address.house_number && address.pedestrian) {
        return `${address.pedestrian} ${address.house_number}`;
    } else if (address.house_number && address.footway) {
        return `${address.footway} ${address.house_number}`;
    } else if (address.house_number && address.cycleway) {
        return `${address.cycleway} ${address.house_number}`;
    } else if (address.road) {
        return address.road;
    } else if (address.pedestrian) {
        return address.pedestrian;
    } else if (address.footway) {
        return address.footway;
    } else if (address.cycleway) {
        return address.cycleway;
    } else {
        console.log('other place', name, address)
        return formatAddress(name, address);
    }
}

class MapView extends React.Component {

    static propTypes = {
        onSelectCoord: PropTypes.func,
        geodata: PropTypes.object,
        onFocus: PropTypes.func.isRequired
    }

    static defaultProps = {
        geodata: {
            adressSelectedBy: 'none',
            lat: startLat,
            lon: startLon,
            valgtZoom: startZoom,
            display_name: ''
        }
    }

    bindMap = (el) => {
        if (el)
            this.map = el.leafletElement;
    }

    handleClick = (e) => {
        var query = {
            lat: e.latlng.lat,
            lon: e.latlng.lng
        };
        nominatim.reverse(query, (err, data) => this.reverseComplted(err, data, query));
    }

    reverseComplted = (err, data, query) => {
        if (err) {
            throw err;
        }

        let geodata = {
            lat: query.lat,
            lon: query.lon,
            display_name: formatAddress_new(data.display_name, data.address),
            valgtZoom: data.address.state === "Oslo" ? 18 : 10,
            adressSelectedBy: 'click',
            outOfBounds: data.address.state !== "Oslo"
        };

        if (this.props.onSelectCoord) {
            this.props.onSelectCoord(geodata);
        }
    }

    renderMarker(geodata) {
        if (geodata && geodata.adressSelectedBy !== 'none') {
            if (geodata.outOfBounds) {
                return (
                    <OpenMarker key={geodata.display_name} position={[geodata.lat, geodata.lon]} icon={icon2}>
                        <Popup>
                            <span>Adressen er utenfor Oslo</span>
                        </Popup>
                    </OpenMarker>
                );
            }
            else {
                return (
                    <Marker position={[geodata.lat, geodata.lon]} icon={icon2}>
                        <Popup>
                            <span>Din valgte posisjon: <br /> {geodata.display_name}</span>
                        </Popup>
                    </Marker>
                );
            }
        }
    }

    render() {
        return (
            <Map
                ref={this.bindMap}
                center={[
                    this.props.geodata ? this.props.geodata.lat : startLat,
                    this.props.geodata ? this.props.geodata.lon : startLon
                ]}
                zoom={this.props.geodata ? this.props.geodata.valgtZoom : startZoom}
                maxZoom={18}
                minZoom={10}
                onClick={this.handleClick}
                zoomControl={false}
                dragging={true}
                boxZoom={true}
                onFocus={this.props.onFocus}
            >
                <TileLayer
                    url='https://api.mapbox.com/styles/v1/webforvaltningen/cirlr93tl0010gyly7o56ugi3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2ViZm9ydmFsdG5pbmdlbiIsImEiOiJjaXJsczQ5dnAwMDMxaG5rd2xnNGt2MGZvIn0.BGtT-dezZ_5hseqXmkMAoQ'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {this.renderMarker(this.props.geodata)}

                {/*<MarkerClusterGroup
                    markers={markers}
                    wrapperOptions={{ enableDefaultStyle: true }}
                />*/}

                <ZoomControl position="bottomright" />
            </Map>
        )
    }
}

export default MapView