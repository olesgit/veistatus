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

    componentWillMount() {
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
    }

    SelectCoord(data) {
        this.setState({valgtAdresse: data.display_name});
          console.log( 'SelectCoord' );
        //  console.log(data);
        // console.log(data.display_name);
        this.setState( { geodata: data });
        if(this.state.selectedPanel === "WelcomePanel") this.setState( { selectedPanel: "AddressPanel"});
        
        // //Zoom into new position
        if(data.zoomin)
            this.setState( { valgtPos: [Number(data.lat), Number(data.lon)], valgtZoom: 18, settMarker: true } )
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
                {this.state.selectedPanel === "WelcomePanel" && <WelcomePanel onSelectAddress={(data) => this.SelectCoord(data)}/>}
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