import React from 'react';
import Geosuggest from 'react-geosuggest';
//Alternativ geocoding component: https://github.com/moroshko/react-autosuggest
//og evt component for select i list: https://github.com/JedWatson/react-select


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

    //Brukes hvis man ikke vil se den innbygde forslagslisten
    getCustomSuggestLabel(suggest) {
        console.log(suggest);
        return true;
    }

    getSuggestLabel(suggest) {
        //console.log(suggest);
        //return(suggest.description);  //Bogstadveien, Oslo, Norway"
        if(suggest.terms && suggest.terms.length > 0) {
            var retval = "";
            suggest.terms.map((term) => {
                if(term.value !== 'Oslo' && term.value !== 'Norway') {
                    if(retval !== '') retval = retval + ', ' + term.value;
                    else retval = term.value;
                }
                return retval;
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

        //var thestyle = { 'input': { 'position': 'relative', 'display': 'block', 'margin': '0 auto' }, 'suggests': { 'backgroundColor': 'white','listStyleType': 'none', 'listStyleImage': 'url(marker-white.png)' }, 'suggestItem': {} };
        var thestyle = { 
'input': { 'width': '100%', 'color': '#4a4a4a', 'fontSize':'24px', 'height': '60px', 'maxWidth': '740px', 'minWidth': '260px', 'position': 'relative', 'display': 'block', 
'margin': '0 auto', 'backgroundColor': '#ffffff', 'border': 'solid 1px #979797' }, 
'suggests': { 'margin': '0', 'padding': '0', 'textAlign': 'left', 'lineHeight': '1.8', 'color': '#4a4a4a', 'fontSize':'24px', 'backgroundColor': 'white', 
'maxWidth': '740px', 'minWidth': '260px','marginLeft': 'auto', 'marginRight': 'auto', 'border': '1px solid grey', 'borderRadius': '20px',
'listStyleType': 'none', 'listStylePosition': 'inside', 'listStyleImage': 'url(marker-white.png)'}, 
'suggestItem': {} 
};


        return (
            <div>
                <Geosuggest
                    ref={el => this._geoSuggest = el}
                    placeholder="Søk etter adresse eller klikk i kart"
                    //initialValue="Oslo"
                    country="no"
                    //fixtures={fixtures}
                    onSuggestSelect={this.onSuggestSelect}
                    getSuggestLabel={this.getSuggestLabel}
                    //skipSuggest={this.getCustomSuggestLabel} //if function returns true, suggestion will not be shown in embedded list
                    bounds={oslobox}
                    //location={new google.maps.LatLng(53.558572, 9.9278215)}
                    //location={latlng}
                    //radius="20"
                    //types={['geocode']}  // Four types are supported: 'establishment' for businesses, 'geocode' for addresses, '(regions)' for administrative regions and '(cities)' for localities. If nothing is specified, all types are returned.
                    style={ thestyle }
                    inputClassName="form-control InputRectangle"
                    aria-describedby="sizing-addon1"
                    />

                {/* Buttons to trigger exposed component functions */}
                {/*<button onClick={() => this._geoSuggest.focus()}>Focus</button>
                <button onClick={() => this._geoSuggest.update('Bog')}>Update</button>
                <button onClick={() => this._geoSuggest.clear()}>Clear</button>*/}
            </div>

        );
    }
}
 
GeoExample.DefaultProps = {
};

GeoExample.propTypes = {
};

