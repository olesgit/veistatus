import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import {MapView} from '../../components/Kart/MapView';
import WelcomePanel from '../../components/Inputs/welcomePanel';
import AddressPanel from '../../components/Inputs/addressPanel';
import CategoryPanel from '../../components/Inputs/categoryPanel';




class StartSideContainer extends Component {
    constructor(props) {
        super(props);

        this.SelectCoord = this.SelectCoord.bind(this);

        this.state = {
            open: true,
            toggleImg: "pil-opp.png",
            selectedPanel: "WelcomePanel",
            geodata: {},
            valgtPos: [59.94, 10.77],
            valgtAdresse: "",
            valgtZoom: 10, 
            settMarker: false
        };
    }


    selectSuggestion(data) {
        //console.log(data);

        var service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({
            placeId: data.place_id
        }, function (place, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                var lat = place.geometry.location.lat();
                var lng = place.geometry.location.lng();
                // console.log(lat);
                // console.log(lng);
                data.lat = lat; data.lon = lng;

                console.log(data);

                //this.SelectCoord(data);
                this.Setstate( { valgtPos: [lat, lng]});
            }
            else {
                console.log("lookup on places returns: ");
                console.log(status);
            }
        });
    }

    componentWillMount() {
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
    }

    SelectCoord(data) {  

        console.log(data);

        //Note: strategi for å velge zoom: 
        //1. hvis valg fra adresse er gjort, settes valgtZoom i data til max zoom, og vi zoomer inn
        //2. hvis valg med click er gjort, settes valgtZoom i data til actual zoom. Vi beholder altså zoomlevel.
        this.setState({valgtAdresse: data.display_name});
        // console.log( 'SelectCoord' );
        //  console.log(data);
        // console.log(data.display_name);
        this.setState( { geodata: data });
        if(this.state.selectedPanel === "WelcomePanel") this.setState( { selectedPanel: "AddressPanel"});
        
        this.setState( { valgtPos: [Number(data.lat),Number(data.lon)], settMarker: true } );
        
        //Zoom into new position
        if(data.valgtzoom)
            this.setState( { valgtZoom: data.valgtzoom } );
    }

    Continue(data) {
          console.log( 'Continue' );
        if(this.state.selectedPanel === "AddressPanel") this.setState( { selectedPanel: "CategoryPanel"});
    }

    render() {
        return (
            <div className="mainmapContainer" id="mapsdiv">
                <div id="mapcontainer">
                    {this.state.selectedPanel === "WelcomePanel" && <MapView id="themaps" onSelectCoord={(data) => this.SelectCoord(data)} pos={this.state.valgtPos} zoom={this.state.valgtZoom} setMarker={this.state.settMarker} />}
                    {this.state.selectedPanel === "AddressPanel" && <MapView id="themaps" onSelectCoord={(data) => this.SelectCoord(data)} pos={this.state.valgtPos} zoom={this.state.valgtZoom} setMarker={this.state.settMarker} />}
                </div>
                {this.state.selectedPanel === "WelcomePanel" && <WelcomePanel onSelectAddress={(data) => this.SelectCoord(data)} selectSuggestion={(data) => this.selectSuggestion(data)}/>}
                {this.state.selectedPanel === "AddressPanel" && <AddressPanel geodata={this.state.geodata} onContinue={(data) => this.Continue(data)}/>}
                {this.state.selectedPanel === "CategoryPanel" && <CategoryPanel geodata={this.state.geodata} onContinue={(data) => this.Continue(data)}/>}
           
            </div>
        );  
    }
}


StartSideContainer.defaultProps = {
}


// StartSideContainer.propTypes = {
// };


function mapStateToProps(state, ownProps) {
    return {
    };
}


const mapDispatchToProps = (dispatch) =>
{
    return bindActionCreators({ }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(StartSideContainer);