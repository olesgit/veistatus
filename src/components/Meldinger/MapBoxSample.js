import React from 'react'
import ReactDOM from 'react-dom'
import { Map, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
const position = [59.94, 10.77]
const markers = [
  {lat: 59.9412, lng: 10.77},
  {lat: 59.9445, lng: 10.77},
  {lat: 59.9467, lng: 10.77}
];
export class MapView extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Map
                    style={{ height: "100vh" }}
                    center={position}
                    zoom={10}>
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
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