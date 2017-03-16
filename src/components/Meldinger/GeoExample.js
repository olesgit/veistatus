import React, { PropTypes } from 'react';
import Geosuggest from 'react-geosuggest';
//Alternativ geocoding component: https://github.com/moroshko/react-autosuggest
//og evt component for select i list: https://github.com/JedWatson/react-select
import { FormGroup } from 'react-bootstrap';


const maxzoom = 18;

export class GeoExample extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.getCustomSuggestLabel = this.getCustomSuggestLabel.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            name: 'noused'
        }
    }

    componentWillMount() {
    }

    componentDidMount() {  //componentDidMount, DOM operations in this, or in componentDidUpdate (DOM operations after updates)
        // var geoinput = document.getElementsByClassName("geosuggest__input-wrapper");
        // console.log(geoinput);

        //geoinput.innerHTML = geoinput.innerHTML + "<span className='input-group-addon' id='sizing-addon1' style={{ 'height': '60px', 'maxHeight': '60px' }}>@</span>";

        // geoinput.appendChild(<div>hei</div>);
        // ReactDOM.findDOMNode()

        // <span className="input-group-addon" id="sizing-addon1" style={{ 'height': '60px', 'maxHeight': '60px' }}>@</span>

        // var span = document.createElement("span");
        // span.innerHTML = "Btn";
        // span.className = "input-group-addon";
        // span.id = "sizing-addon1";
        // span.style = { 'height': '60px', 'maxHeight': '60px' };
        // geoinput.appendChild(span);

        // ReactDOM.render(
        //     <ChildComponent/>,
        //     document.getElementsByClassName("geosuggest__input-wrapper")
        // )
    }

    nameIsValid() {
        return true;
    }

    onChange() {
        //console.log("onChange ....................................");
        this.props.onChange();
    }

    onSuggestSelect(suggest) {
        //console.log(suggest);
        var data = { display_name: suggest.label, lat: suggest.location.lat, lon: suggest.location.lng, valgtzoom: maxzoom  };
        this.props.onSelectAddress(data);
    }

    //Brukes bare hvis den innbygde forslagslisten er gjemt. Merk at suggest.location.lat, lng ikke er tilgjengelig her, bare i SuggestSelect
    getCustomSuggestLabel(suggest) {
        // console.log("getCustomSuggestLabel");
        // console.log(suggest);
        this.props.onSuggest(suggest);
        return true;
    }

    //Brukes bare hvis den innbygde forslagslisten er synlig
    getSuggestLabel(suggest) {
        console.log(suggest);
        return(suggest.description);  //Bogstadveien, Oslo, Norway"

        // //To remove Oslo, Norway ie
        // if(suggest.terms && suggest.terms.length > 0) {
        //     var retval = "";
        //     suggest.terms.map((term) => {
        //         if(term.value !== 'Oslo' && term.value !== 'Norway') {
        //             if(retval !== '') retval = retval + ', ' + term.value;
        //             else retval = term.value;
        //         }
        //         return retval;
        //     })
        //     if(retval === "") retval = "Oslo, Norway";
        //     return(retval);
        // }
        // else {
        // if(suggest.description)
        //     return(suggest.description);
        // else if(suggest.label)
        //     return(suggest.label);
        // }
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
'margin': '0 auto', 'backgroundColor': '#ffffff', 'border': 'solid 1px #979797', 'textAlign': 'left' }, 
'suggests': { 'margin': '0', 'padding': '0', 'textAlign': 'left', 'lineHeight': '1.8', 'color': '#4a4a4a', 'fontSize':'24px', 'backgroundColor': 'white', 
'maxWidth': '740px', 'minWidth': '260px','marginLeft': 'auto', 'marginRight': 'auto', 'border': '1px solid grey', 'borderRadius': '0px',
'listStyleType': 'none', 'listStylePosition': 'outside', 'listStyleImage': 'url(marker-white.png)', 'paddingLeft': '10px'}, 
'suggestItem': {} 
};


        return (
            <FormGroup controlId="formControlsName" className="formgroupoverlaycontainer" style={{ 'backgroundColor': 'green' }}>

                <div className="input-group input-group-lg" style={{
                    'textAlign': 'left', 'width': '100%', 'maxWidth': '740px', 'minWidth': '260px', 'backgroundColor': 'transparent',
                    'marginLeft': 'auto', 'marginRight': 'auto'
                }}>

                    <Geosuggest
                        ref={el => this._geoSuggest = el}
                        placeholder="Søk etter adresse eller klikk i kart"
                        //initialValue="Oslo"
                        country="no"
                        //fixtures={fixtures}
                        onSuggestSelect={this.onSuggestSelect}
                        getSuggestLabel={this.getSuggestLabel}
                        skipSuggest={this.getCustomSuggestLabel} //if function returns true, suggestion will not be shown in embedded list
                        bounds={oslobox}
                        //location={new google.maps.LatLng(53.558572, 9.9278215)}
                        //location={latlng}
                        //radius="20"
                        //types={['geocode']}  // Four types are supported: 'establishment' for businesses, 'geocode' for addresses, '(regions)' for administrative regions and '(cities)' for localities. If nothing is specified, all types are returned.
                        style={thestyle}
                        aria-describedby="sizing-addon1"
                        //queryDelay="350"
                        onChange={this.onChange}
                        //onKeyPress
                        //label If the label and a id prop (see "Others") were supplied, a <label> tag with the passed label text will be rendered. The <label> element's for attribute will correctly point to the id of the <input> element.
                        //className=""  //Add an additional class to the geosuggest container.
                        inputClassName="form-control InputRectangle"
                        //inputClassName="input-group-addon"  //Add an additional class to the input.
                        //suggestsClassName=""  //Add an additional class to suggest list.
                        //suggestsHiddenClassName=""  //Additional className to toggle as the list of suggestions changes visibility.
                        //suggestItemClassName=""  //Add an additional class to suggest item.
                        //suggestItemActiveClassName=""  //Additional className to add when a suggestion item is active.
                    />

                    {/* Buttons to trigger exposed component functions */}
                    {/*<button onClick={() => this._geoSuggest.focus()}>Focus</button>
                <button onClick={() => this._geoSuggest.update('Bog')}>Update</button>
                <button onClick={() => this._geoSuggest.clear()}>Clear</button>*/}

                    {/*<span className="input-group-addon" id="sizing-addon1" style={{ 'height': '60px', 'maxHeight': '60px' }}>@</span>*/}

                </div>

            </FormGroup>

        );
    }
}
 
GeoExample.DefaultProps = {
};

GeoExample.propTypes = {
    onSelectAddress: PropTypes.func.isRequired,
    onSuggest: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

