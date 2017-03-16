import React, {PropTypes} from 'react'
// import ReactDOM from 'react-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {nominatim} from './Nominatim';
import { /*divIcon,*/ icon } from 'leaflet';

import '../../css/kart/kart.css'; 

//const position = [59.94, 10.77];
const markers = [
  {lat: 59.9412, lng: 10.77},
  {lat: 59.9445, lng: 10.77},
  {lat: 59.9467, lng: 10.77}
];

    
// const icon1 = divIcon({className: 'leaflet-div-icon2'});  //built in red circle

var icon2 = icon({
    iconUrl: 'map-pin.png',
    //shadowUrl: 'marker-white.png',
    iconSize:     [24, 30], // size of the icon
    //shadowSize:   [24, 30], // size of the shadow
    iconAnchor:   [12, 30], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
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

    

export class MapView extends React.Component {
    constructor(props) {
        super(props);

        this.bindMap = this.bindMap.bind(this);

        this.state = {
            lat: 0,
            lon: 0
        };
    }

    bindMap(el) {
        if(el)
            this.map = el.leafletElement;
    }

    handleClick= (e) => {
        var query = {
            lat: e.latlng.lat,
            lon: e.latlng.lng
        };
     
        this.setState( {lat: e.latlng.lat, lon: e.latlng.lng});  //Merk: Disse koord må brukes, og ikke data koord fra nominatim reverseComplted (som gir en gangs warning: Warning: Failed prop type: Invalid prop `position` supplied to `Marker`.) ES5/ES6
        nominatim.reverse(query, this.reverseComplted);
    }

    reverseComplted = (err, data) => {
        if (err) {
            throw err;
        }

        var z = this.map.getZoom();
        data.valgtzoom = z;
        this.props.onSelectCoord(data);
    }

    render() {
        var lat, lon, showmarker = false;
        if(this.props.setMarker === true)
        {
            lat = this.props.pos[0]; lon = this.props.pos[1]; showmarker = true;
        }
        if(this.state.lat !== 0)
        {
            lat = this.state.lat; lon = this.state.lon; showmarker = true;
        }

        const MarkerInstance = (
            (showmarker === true) &&
            <Marker position={[lat, lon]} icon={icon2}>
                <Popup>
                    <span>Din valgte posisjon. <br /> Ny funksjonalitet kommer.</span>
                </Popup>
            </Marker>
        )
        return (
            <div>
                <Map
                    ref={this.bindMap}
                    style={{ height: "100vh" }}
                    center={this.props.pos}
                    zoom={this.props.zoom}
                    maxZoom={18}
                    minZoom={7}
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
    onSelectCoord: PropTypes.func.isRequired,
    pos: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
    setMarker: PropTypes.bool.isRequired
};
