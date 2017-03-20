import React, { Component } from 'react';
import { connect } from 'react-redux';
import {MapView} from '../../components/Kart/MapView';
import WelcomePanel from '../../components/Inputs/welcomePanel';
import AddressPanel from '../../components/Inputs/addressPanel';
import CategoryPanel from '../../components/Inputs/categoryPanel';
import PicturePanel from '../../components/Inputs/picturePanel';
import { startLat, startLon, startZoom } from "../../constants/settings";
import '../../css/kart/Maps.css';



class StartSideContainer extends Component {
    constructor(props) {
        super(props);

        this.SelectCoord = this.SelectCoord.bind(this);
        this.selectSuggestion = this.selectSuggestion.bind(this);
        this.callback = this.callback.bind(this);

        this.state = {
            open: true,
            toggleImg: "pil-opp.png",
            selectedPanel: "WelcomePanel",
            geodata: { adressSelectedBy: 'none', lat: startLat, lon: startLon, valgtZoom: startZoom, display_name: '', centerlat: startLat, centerlon: startLon }
        };
    }

    selectSuggestion(data) {
        var service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({
            placeId: data.place_id
        }, (place, status) => this.callback(place, status, data)
        );
    }

    callback(place, status, data) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            data.lat = place.geometry.location.lat();
            data.lon = place.geometry.location.lng();
            this.setState({ geodata: {adressSelectedBy: 'text', lat: data.lat, lon: data.lon, valgtZoom: 18, display_name: data.adresse, id: data.id, centerlat: data.lat, centerlon: data.lon } });

            this.SelectCoord(this.state.geodata);
        }
        else {
            console.log("Error: lookup on places returns: ");
            console.log(status);
        }
    }

    SelectCoord(data) {  
        if(!data.adressSelectedBy) return;  //callback from input on enter. should be set by selection in list. TODO set search button default to select top entry in list
        this.setState( { geodata: data });
        if(this.state.selectedPanel === "WelcomePanel") this.setState( { selectedPanel: "AddressPanel"});
    }

    Continue(data) {
        //if(this.state.selectedPanel === "AddressPanel") this.setState( { selectedPanel: "CategoryPanel"});
        if(this.state.selectedPanel === "AddressPanel") this.setState( { selectedPanel: "PicturePanel"});
    }

    render() {
        return (
            <div className="mainmapContainer">
                <div id="mapcontainer">
                    {this.state.selectedPanel === "WelcomePanel" && <MapView id="themaps" geodata={this.state.geodata} onSelectCoord={(data) => this.SelectCoord(data)} />}
                    {this.state.selectedPanel === "AddressPanel" && <MapView id="themaps" geodata={this.state.geodata} onSelectCoord={(data) => this.SelectCoord(data)} />}
                </div>
                {this.state.selectedPanel === "WelcomePanel" && <WelcomePanel geodata={this.state.geodata} onSelectAddress={(data) => this.SelectCoord(data)} selectSuggestion={(data) => this.selectSuggestion(data)}/>}
                {this.state.selectedPanel === "AddressPanel" && <AddressPanel geodata={this.state.geodata} onContinue={(data) => this.Continue(data)} onSelectAddress={(data) => this.SelectCoord(data)} selectSuggestion={(data) => this.selectSuggestion(data)}/>}
                {this.state.selectedPanel === "CategoryPanel" && <CategoryPanel geodata={this.state.geodata} onContinue={(data) => this.Continue(data)}/>}
                {this.state.selectedPanel === "PicturePanel" && <PicturePanel geodata={this.state.geodata} onContinue={(data) => this.Continue(data)}/>}
            </div>
        );  
    }
}

StartSideContainer.defaultProps = {
}

StartSideContainer.propTypes = {
};

function mapStateToProps(state, ownProps) {
    return {
    };
}

const mapDispatchToProps = (dispatch) =>
{
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartSideContainer);