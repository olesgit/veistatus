import React, {PropTypes} from 'react';
import Geosuggest from 'react-geosuggest';


export class GeoExample extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: 'noused'
        }
    }

    componentWillMount() {
    }

    nameIsValid() {
        return true;
    }

    onSuggestSelect(suggest) {
        console.log(suggest);
    }

    getSuggestLabel(suggest) {
        console.log(suggest);
        //return(suggest.description);  //Bogstadveien, Oslo, Norway"
        if(suggest.terms && suggest.terms.length > 0) {
            var retval = "";
            suggest.terms.map((term) => {
                if(term.value !== 'Oslo' && term.value !== 'Norway') {
                    if(retval !== '') retval = retval + ', ' + term.value;
                    else retval = term.value;
                }
            })
            if(retval === "") retval = "Oslo, Norway";
            return(retval);
        }
        else {
        if(suggest.description)
            return(suggest.description);
        else if(suggest.label)
            return(suggest.label);
        }
    }

    render() {

        //var latlng = new window.google.maps.LatLng(59.94, 10.77);

        var sw = new window.google.maps.LatLng(59.7868158061153,10.49674987792969);
        var ne = new window.google.maps.LatLng(60.141504734793386,10.967788696289064);
        var oslobox = new window.google.maps.LatLngBounds(sw, ne);

        // var fixtures = [
        //     { label: 'Old Elbe Tunnel, Hamburg', location: { lat: 53.5459, lng: 9.966576 } },
        //     { label: 'Reeperbahn, Hamburg', location: { lat: 53.5495629, lng: 9.9625838 } },
        //     { label: 'Alster, Hamburg', location: { lat: 53.5610398, lng: 10.0259135 } }
        // ];

        return (
            <div>
                <Geosuggest
                    ref={el => this._geoSuggest = el}
                    placeholder="Start typing!"
                    initialValue="Oslo"
                    country="no"
                    //fixtures={fixtures}
                    onSuggestSelect={this.onSuggestSelect}
                    getSuggestLabel={this.getSuggestLabel}
                    bounds={oslobox}
                    //location={new google.maps.LatLng(53.558572, 9.9278215)}
                    //location={latlng}
                    //radius="20"
                    types={['geocode']}  // Four types are supported: 'establishment' for businesses, 'geocode' for addresses, '(regions)' for administrative regions and '(cities)' for localities. If nothing is specified, all types are returned.
                    />

                {/* Buttons to trigger exposed component functions */}
                <button onClick={() => this._geoSuggest.focus()}>Focus</button>
                <button onClick={() => this._geoSuggest.update('Bog')}>Update</button>
                <button onClick={() => this._geoSuggest.clear()}>Clear</button>
            </div>

        );
    }
}
 
GeoExample.DefaultProps = {
};

GeoExample.propTypes = {
};

