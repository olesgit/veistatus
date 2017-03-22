import React, { PropTypes } from 'react';
import Geosuggest from 'react-geosuggest';
//Alternativ geocoding component: https://github.com/moroshko/react-autosuggest
//og evt component for select i list: https://github.com/JedWatson/react-select
import { FormGroup } from 'react-bootstrap';
import '../../css/Geocoding/Geocoding.css';

const maxzoom = 18;

export class GeoExample extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.getCustomSuggestLabel = this.getCustomSuggestLabel.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clear === true) {
            this._geoSuggest.clear();
            setTimeout(() => { this._geoSuggest.focus() }, 200);
        }
    }

    onChange() {
        this.props.onChange();
    }

    onSuggestSelect(suggest) {
        var data = { display_name: suggest.label, lat: suggest.location.lat, lon: suggest.location.lng, valgtzoom: maxzoom };
        this.props.onSelectAddress(data);
    }

    //Brukes bare hvis den innbygde forslagslisten er gjemt. Merk at suggest.location.lat, lng ikke er tilgjengelig her, bare i SuggestSelect
    getCustomSuggestLabel(suggest) {
        this.props.onSuggest(suggest);
        return true;
    }

    //Brukes bare hvis den innbygde forslagslisten er synlig
    getSuggestLabel(suggest) {
        return (suggest.description);  //Bogstadveien, Oslo, Norway"

        // //Eksempel: To remove Oslo, Norway ie
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

        var sw = new window.google.maps.LatLng(59.7868158061153, 10.49674987792969);
        var ne = new window.google.maps.LatLng(60.141504734793386, 10.967788696289064);
        var oslobox = new window.google.maps.LatLngBounds(sw, ne);

        //Style with embedded suggest list
        //var thestyle = { 'input': { 'position': 'relative', 'display': 'block', 'margin': '0 auto' }, 'suggests': { 'backgroundColor': 'white','listStyleType': 'none', 'listStyleImage': 'url(marker-white.png)' }, 'suggestItem': {} };
        //         var thestyle = { 
        // 'input': { 'width': '100%', 'color': '#4a4a4a', 'fontSize':'24px', 'height': '60px', 'maxWidth': '740px', 'minWidth': '260px', 'position': 'relative', 'display': 'block', 
        // 'margin': '0 auto', 'backgroundColor': '#ffffff', 'border': 'solid 1px #979797', 'textAlign': 'left' }, 
        // 'suggests': { 'margin': '0', 'padding': '0', 'textAlign': 'left', 'lineHeight': '1.8', 'color': '#4a4a4a', 'fontSize':'24px', 'backgroundColor': 'white', 
        // 'maxWidth': '740px', 'minWidth': '260px','marginLeft': 'auto', 'marginRight': 'auto', 'border': '1px solid grey', 'borderRadius': '0px',
        // 'listStyleType': 'none', 'listStylePosition': 'outside', 'listStyleImage': 'url(marker-white.png)', 'paddingLeft': '10px'}, 
        // 'suggestItem': {} 
        // };

        var thestyle = {
            'input': {
                'width': '100%', 'color': '#4a4a4a', 'fontSize': '24px', ...this.props.Height, 'position': 'relative', 'display': 'block',
                'margin': '0 auto', 'backgroundColor': '#ffffff', 'border': 'solid 1px #979797', 'textAlign': 'left', 'borderRightStyle': 'none'
            },
            'suggests': {},
            'suggestItem': {}
        };
        var text = this.props.geodata ? this.props.geodata.display_name : '';
        return (
            <FormGroup controlId="formControlsName" className="formgroupoverlaycontainer" style={{ 'backgroundColor': 'green' }}>

                <div className="input-group input-group-lg" style={{
                    'textAlign': 'left', 'width': '100%', 'backgroundColor': 'transparent',
                    'marginLeft': 'auto', 'marginRight': 'auto'
                }}>

                    <Geosuggest
                        ref={el => this._geoSuggest = el}
                        placeholder="Søk etter adresse eller klikk i kart"
                        initialValue={text}
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
                        inputClassName="Geo-Input-Adresse-Panel"  //"form-control InputRectangle"
                    //inputClassName="input-group-addon"  //Add an additional class to the input.
                    //suggestsClassName=""  //Add an additional class to suggest list.
                    //suggestsHiddenClassName=""  //Additional className to toggle as the list of suggestions changes visibility.
                    //suggestItemClassName=""  //Add an additional class to suggest item.
                    //suggestItemActiveClassName=""  //Additional className to add when a suggestion item is active.
                    />

                </div>

            </FormGroup>

        );
    }
}

GeoExample.DefaultProps = {
};

GeoExample.propTypes = {
    geodata: PropTypes.object,
    onSelectAddress: PropTypes.func.isRequired,
    onSuggest: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    clear: PropTypes.bool.isRequired,
    Height: PropTypes.object.isRequired
};

