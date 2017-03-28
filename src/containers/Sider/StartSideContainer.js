import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MapViewContainer from '../../containers/Map/MapViewContainer';
import MapSearchContainer from '../../containers/Map/MapSearchContainer';
import { getCategoriesIfNeeded } from '../../actions/messageActions'

import '../../css/kart/Maps.css';

import MessageWizard from '../../components/Message/MessageWizard'

class StartSideContainer extends Component {

    static propTypes = {
        step: PropTypes.string.isRequired,
        geodata: PropTypes.object,
        hideWelcome: PropTypes.number,
        getCategoriesIfNeeded: PropTypes.func.isRequired
    }

    static defaultProps = {
        step: 'welcome'
    }

    componentDidMount() {
        this.props.getCategoriesIfNeeded();
    }

    render() {
        const { step, geodata, hideWelcome } = this.props;
        return (
            <div className="mainmapContainer">
                <div id="mapcontainer">
                    <MapSearchContainer showSearch={step === 'welcome'} />
                    <MapViewContainer />
                </div>
                <MessageWizard step={step} geodata={geodata} hideWelcome={hideWelcome} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        step: state.message.step,
        geodata: state.map.geodata,
        hideWelcome: state.message.hideWelcome
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategoriesIfNeeded: bindActionCreators(getCategoriesIfNeeded, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartSideContainer);