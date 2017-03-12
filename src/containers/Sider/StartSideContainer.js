import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import {MapView} from '../../components/Kart/MapView';
import WelcomePanel from '../../components/Inputs/welcomePanel';
import AddressPanel from '../../components//Inputs/addressPanel';


class StartSideContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            valgtAdresse: "",
            toggleImg: "pil-opp.png",
            selectedPanel: "WelcomePanel",
            geodata: {}
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
        // console.log(data.display_name);
        this.setState( { geodata: data });
        if(this.state.selectedPanel === "WelcomePanel") this.setState( { selectedPanel: "AddressPanel"});
    }


    render() {        
        return (
            <div className="mainmapContainer">
                <div id="mapcontainer">
                    <MapView id="themaps" onSelectCoord={(data) => this.SelectCoord(data)} />
                </div>
                {this.state.selectedPanel === "WelcomePanel" && <WelcomePanel />}
                {this.state.selectedPanel === "AddressPanel" && <AddressPanel geodata={this.state.geodata}/>}
                
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