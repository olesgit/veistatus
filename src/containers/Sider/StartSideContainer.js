import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MapViewContainer from '../../containers/Map/MapViewContainer';
import MapSearchContainer from '../../containers/Map/MapSearchContainer';
import { getCategories } from '../../actions/messageActions'

import '../../css/kart/Maps.css';

import MessageWizard from '../../components/Message/MessageWizard'

class StartSideContainer extends Component {

    static propTypes = {
        step: PropTypes.string,
        getCategories: PropTypes.func.isRequired
    }

    static defaultProps = {
        step: 'welcome'
    }

    componentDidMount() {
        this.props.getCategories();
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

function mapDispatchToProps(dispatch) {
    return {
        getCategories: bindActionCreators(getCategories, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartSideContainer);