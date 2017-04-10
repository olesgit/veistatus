import React, { PropTypes } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import nominatim from './Nominatim';
import { /*divIcon,*/ icon } from 'leaflet';
import { startLat, startLon, startZoom } from "../../constants/settings";
import '../../css/kart/kart.css';

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
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
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



class MapView extends React.Component {

    static propTypes = {
        onSelectCoord: PropTypes.func,
        geodata: PropTypes.object
    }

    static defaultProps = {
        geodata: {
            adressSelectedBy: 'none',
            lat: startLat,
            lon: startLon,
            valgtZoom: startZoom,
            display_name: '',
            centerlat: startLat,
            centerlon: startLon
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
        nominatim.reverse(query, this.reverseComplted);
    }

    reverseComplted = (err, data) => {
        if (err) {
            throw err;
        }
        let geodata = {
            lat: Number(data.lat), lon: Number(data.lon), place_id: '', display_name: data.display_name, valgtZoom: this.map.getZoom(),
            id: '', adressSelectedBy: 'click', centerlat: this.map.getCenter().lat, centerlon: this.map.getCenter().lng
        };

        if (this.props.onSelectCoord) {
            this.props.onSelectCoord(geodata);
        }
    }

    renderMarker(geodata) {
        if (geodata && geodata.adressSelectedBy !== 'none') {
            return (
                <Marker position={[geodata.lat, geodata.lon]} icon={icon2}>
                    <Popup>
                        <span>Din valgte posisjon: <br /> {geodata.display_name}</span>
                    </Popup>
                </Marker>
            );
        }
    }

    render() {
        return (
            <Map
                ref={this.bindMap}
                style={{ height: "100vh" }}
                center={[
                    this.props.geodata ? this.props.geodata.centerlat : startLat,
                    this.props.geodata ? this.props.geodata.centerlon : startLon
                ]}
                zoom={this.props.geodata ? this.props.geodata.valgtZoom : startZoom}
                maxZoom={18}
                minZoom={7}
                onClick={this.handleClick}
                zoomControl={false}
                dragging={true}
                boxZoom={true}
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
            </Map>
        )
    }
}

export default MapView