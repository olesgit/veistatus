import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MapViewContainer from '../../containers/Map/MapViewContainer';
import MapSearchContainer from '../../containers/Map/MapSearchContainer';
import { changeStep, getCategories } from '../../actions/messageActions'

import '../../css/kart/Maps.css';

import MessageWizard from '../../components/Message/MessageWizard'

class StartSideContainer extends Component {

    static propTypes = {
        step: PropTypes.string.isRequired,
        getCategories: PropTypes.func.isRequired,
        changeStep: PropTypes.func.isRequired
    }

    state = {
        geodata: null
    }

    changeLocation = (geodata) => {
        this.setState({ geodata: geodata });
        this.props.changeStep('address');
    }

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { step } = this.props;
        const { geodata } = this.state;
        return (
            <div className="mainmapContainer">
                <div id="mapcontainer">
                    <MapSearchContainer geodata={geodata} locationSeleted={this.changeLocation} showSearch={step === 'welcome'} />
                    <MapViewContainer geodata={geodata} onSelectCoord={this.changeLocation} />
                </div>
                <MessageWizard step={step} geodata={geodata} locationSeleted={this.changeLocation} changeStep={this.props.changeStep} />
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
        getCategories: bindActionCreators(getCategories, dispatch),
        changeStep: bindActionCreators(changeStep, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartSideContainer);