import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MapViewContainer from '../../containers/Map/MapViewContainer';
import MapSearchContainer from '../../containers/Map/MapSearchContainer';
import { getCategoriesIfNeeded } from '../../actions/messageActions'

import './Startpage.css';

import MessageWizardContainer from '../Message/MessageWizardContainer'

class Startpage extends Component {

    static propTypes = {
        getCategoriesIfNeeded: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getCategoriesIfNeeded();
    }

    render() {
        return (
            <div id="startpage">
                <div className="map-container">
                    <MapViewContainer />
                </div>
                <MessageWizardContainer />
                <MapSearchContainer />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategoriesIfNeeded: bindActionCreators(getCategoriesIfNeeded, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Startpage);