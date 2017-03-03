import React, {PropTypes} from 'react'
// import ReactDOM from 'react-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {nominatim} from './Nominatim';
import { divIcon } from 'leaflet';

import '../../css/kart/kart.css';

const position = [59.94, 10.77];
const markers = [
  {lat: 59.9412, lng: 10.77},
  {lat: 59.9445, lng: 10.77},
  {lat: 59.9467, lng: 10.77}
];

    
const icon = divIcon({className: 'leaflet-div-icon2'});



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


    

export class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lon: 0
        };
    }

    handleClick= (e) => {
        var query = {
            lat: e.latlng.lat,
            lon: e.latlng.lng
        };
        
        this.setState( {lat: e.latlng.lat, lon: e.latlng.lng});  //Merk: Disse koord må brukes, og ikke data fra nominatim reverseComplted (som gir en gangs warning: Warning: Failed prop type: Invalid prop `position` supplied to `Marker`.) ES5/ES6
        nominatim.reverse(query, this.reverseComplted);
    }

    reverseComplted = (err, data) => {
        if (err) {
            throw err;
        }
        this.props.onSelectCoord(data);
    }

    render() {
        const MarkerInstance = (
            (this.state.lat !== 0) &&
            <Marker position={[this.state.lat, this.state.lon]} icon={icon}>
                <Popup>
                    <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                </Popup>
            </Marker>
        )
        return (
            <div>
                <Map
                    style={{ height: "100vh" }}
                    center={position}
                    zoom={10}
                    onClick={this.handleClick}
                    >
                    <TileLayer
                        url='https://api.mapbox.com/styles/v1/webforvaltningen/cirlr93tl0010gyly7o56ugi3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2ViZm9ydmFsdG5pbmdlbiIsImEiOiJjaXJsczQ5dnAwMDMxaG5rd2xnNGt2MGZvIn0.BGtT-dezZ_5hseqXmkMAoQ'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    {MarkerInstance}

                    <MarkerClusterGroup
                        markers={markers}
                        wrapperOptions={{ enableDefaultStyle: true }}
                    />
                </Map>
            </div>
        )
    }
}

MapView.propTypes = {
    onSelectCoord: PropTypes.func.isRequired
};
