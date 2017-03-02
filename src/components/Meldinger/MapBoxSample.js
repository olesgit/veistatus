import React from 'react'
import ReactDOM from 'react-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';

const position = [59.94, 10.77]
const markers = [
  {lat: 59.9412, lng: 10.77},
  {lat: 59.9445, lng: 10.77},
  {lat: 59.9467, lng: 10.77}
];
var nominatim = require('nominatim-client');

//TileLayer settings:
//orginal sample:
// url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// as from barnehager i oslo:
// L.tileLayer('https://api.mapbox.com/styles/v1/webforvaltningen/cirlr93tl0010gyly7o56ugi3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2ViZm9ydmFsdG5pbmdlbiIsImEiOiJjaXJsczQ5dnAwMDMxaG5rd2xnNGt2MGZvIn0.BGtT-dezZ_5hseqXmkMAoQ', {
//         attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//         maxZoom: 18,
//         minZoom: 7,
//         detectRetina: true


// Set the global settings here 
nominatim.global({
    useragent: "BymeldingPortal",                   // The name of your application 
    referer: 'http://bymelding.no',                 // The referer link 
    email: 'ole.petter.haugen@bym.oslo.kommune.no'  // The valid email 
});



export class MapView extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);

        var query = {
            lat: e.latlng.lat,
            lon: e.latlng.lng
        };

        nominatim.reverse(query, function (err, data) {
            if (err) {
                throw err;
            }

            console.log(data);
            console.log(data.display_name);
        });
    }

    render() {
        return (
            <div>
                <Map
                    style={{ height: "100vh" }}
                    center={position}
                    zoom={10}
                    onClick={ (e) => this.handleClick(e)}
                    >
                    <TileLayer
                        url='https://api.mapbox.com/styles/v1/webforvaltningen/cirlr93tl0010gyly7o56ugi3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2ViZm9ydmFsdG5pbmdlbiIsImEiOiJjaXJsczQ5dnAwMDMxaG5rd2xnNGt2MGZvIn0.BGtT-dezZ_5hseqXmkMAoQ'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <MarkerClusterGroup
                        markers={markers}
                        wrapperOptions={{ enableDefaultStyle: true }}
                    />
                </Map>
            </div>
        )
    }
}