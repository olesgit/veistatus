import React, {PropTypes} from 'react'
// import ReactDOM from 'react-dom'
import { Map, TileLayer /*, Marker, Popup */ } from 'react-leaflet'
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



// //Docs on nominatim (place these in separate file)
// //nominatim.reverse can return objects of 3 osm_types: node, way, relation. Examples:
// // 1: node
/*<reversegeocode timestamp="Thu, 02 Mar 17 07:51:07 +0000" attribution="Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright" querystring="format=xml&lat=59.9199616&lon=10.7311974&zoom=18&addressdetails=1">
<result place_id="33239011" osm_type="node" osm_id="2785846864" lat="59.9199616" lon="10.7311974" boundingbox="59.9198616,59.9200616,10.7310974,10.7312974">
14B, Hegdehaugsveien, Homansbyen, Frogner, Oslo, 0167, Norge
</result>
<addressparts>
<house_number>14B</house_number>
<road>Hegdehaugsveien</road>
<suburb>Homansbyen</suburb>
<city_district>Frogner</city_district>
<city>Oslo</city>
<county>Oslo</county>
<state>Oslo</state>
<postcode>0167</postcode>
<country>Norge</country>
<country_code>no</country_code>
</addressparts>
</reversegeocode>*/
// // 2: way
/*<reversegeocode timestamp="Thu, 02 Mar 17 07:55:16 +0000" attribution="Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright" querystring="format=xml&lat=59.92977&lon=10.5166090388374&zoom=18&addressdetails=1">
<result place_id="117122543" osm_type="way" osm_id="230768207" ref="Kolsåstoppen" lat="59.92977" lon="10.5166090388374" boundingbox="59.9266855,59.932213,10.5141707,10.5212765">
Kolsåstoppen, Øvre Toppenhaug, Hammerbakken, Bærums Verk, Sandvika, Bærum, Akershus, 1353, Norge
</result>
<addressparts>
<nature_reserve>Kolsåstoppen</nature_reserve>
<road>Øvre Toppenhaug</road>
<neighbourhood>Hammerbakken</neighbourhood>
<suburb>Bærums Verk</suburb>
<town>Sandvika</town>
<county>Bærum</county>
<state>Akershus</state>
<postcode>1353</postcode>
<country>Norge</country>
<country_code>no</country_code>
</addressparts>
</reversegeocode>*/
// // 3: relation. Relation can f.ex be bridge, tunnel, destination_sign, enforcement (red light, speed camera), public_transport, site , route (bus routes, cycle routes, numbered highways), etc def on http://wiki.openstreetmap.org/wiki/Types_of_relation
// // NOTE: attractions og andre definisjoner kan godt bli listet som type way når vi slår opp reverse med koordinater.
/*<reversegeocode timestamp="Thu, 02 Mar 17 08:27:07 +0000" attribution="Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright" querystring="format=xml&osm_id=146656&zoom=18&addressdetails=1&osm_type=R">
<result place_id="158717208" osm_type="relation" osm_id="146656" ref="Manchester" lat="53.4791301" lon="-2.2441008" boundingbox="53.3401207,53.5446042,-2.3198966,-2.1468277">
Manchester, Greater Manchester, North West England, England, Storbritannia
</result>
<addressparts>
<city>Manchester</city>
<county>Greater Manchester</county>
<state_district>North West England</state_district>
<state>England</state>
<country>Storbritannia</country>
<country_code>gb</country_code>
</addressparts>
</reversegeocode>*/



// Set the global settings here 
nominatim.global({
    useragent: "BymeldingPortal",                   // The name of your application 
    referer: 'http://bymelding.no',                 // The referer link 
    email: 'ole.petter.haugen@bym.oslo.kommune.no'  // The valid email 
});



export class MapBoxSample extends React.Component {
    constructor(props) {
        super(props)

                this.state = {
            visningstype: "123"
        };
    }

    handleClick= (e) => {

        //var t_this = this;

        //console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);

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

        //console.log(this.props);

        this.props.onSelectCoord(data);
        //console.log(data.display_name);
    }

    render() {
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

                    <MarkerClusterGroup
                        markers={markers}
                        wrapperOptions={{ enableDefaultStyle: true }}
                    />
                </Map>


                <button onClick={ (e) => this.props.onSelectCoord()}>click me</button>
            </div>
        )
    }
}

MapBoxSample.propTypes = {
    onSelectCoord: PropTypes.func.isRequired
};
