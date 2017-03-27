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
        getCategories: PropTypes.func.isRequired
    }

    state = {
        step: 'welcome'
    }

    changeStep = (nextStep) => {
        this.setState({ step: nextStep });
    }

    changeLocation = (geodata) => {
        this.setState({ geodata: geodata, step: 'address' });
    }

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { step, geodata } = this.state;
        return (
            <div className="mainmapContainer">
                <div id="mapcontainer">
                    <MapSearchContainer geodata={geodata} locationSeleted={this.changeLocation} showSearch={step === 'welcome'} />
                    <MapViewContainer geodata={geodata} onSelectCoord={this.changeLocation} />
                </div>
                <MessageWizard step={step} geodata={geodata} changeStep={this.changeStep} />
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