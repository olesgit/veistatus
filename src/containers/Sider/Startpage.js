import classNames from 'classnames'
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
        getCategoriesIfNeeded: PropTypes.func.isRequired,
        showLoginDialog: PropTypes.func.isRequired,
        showRegisterUser: PropTypes.func.isRequired,
        pullDown: PropTypes.bool.isRequired
    }

    componentDidMount() {
        this.props.getCategoriesIfNeeded();
    }

    shouldHideWelcome = () => {
        this.wizard.getWrappedInstance().doHideWelcome();
    }

    render() {
        const map = classNames("map-container", { "pull-down": this.props.pullDown });
        return (
            <div id="startpage">
                <div className={map}>
                    <MapViewContainer onFocus={this.shouldHideWelcome} />
                </div>
                <MessageWizardContainer
                    ref={r => this.wizard = r}
                    showLoginDialog={this.props.showLoginDialog}
                    showRegisterUser={this.props.showRegisterUser}
                />
                <MapSearchContainer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pullDown: state.message.step === 'address-map'
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategoriesIfNeeded: bindActionCreators(getCategoriesIfNeeded, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Startpage);