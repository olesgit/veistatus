import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import MapViewContainer from '../../containers/Map/MapViewContainer';
import MapSearchContainer from '../../containers/Map/MapSearchContainer';

import '../../css/kart/Maps.css';

import MessageWizard from '../../components/Message/MessageWizard'

class StartSideContainer extends Component {

    static propTypes = {
        step: PropTypes.string
    }

    static defaultProps = {
        step: 'welcome'
    }

    render() {
        return (
            <div className="mainmapContainer">
                <div id="mapcontainer">
                    <MapSearchContainer />
                    <MapViewContainer id="themaps" />
                </div>
                <MessageWizard step={this.props.step} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        step: state.message.step
    };
}

export default connect(mapStateToProps)(StartSideContainer);