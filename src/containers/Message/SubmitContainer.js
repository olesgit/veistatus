import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Submit from '../../components/Message/Submit'
import { submitMessage } from '../../actions/messageActions'

function bindSubmitMessageToMessage(submitMessage, stateProps, ownProps) {
    return () => submitMessage({
        "innsenderNavn": stateProps.user != null ? stateProps.user.sub : null,
        "innsenderEpost": stateProps.user != null ? stateProps.user.sub : null,
        "meldingstypeId": ownProps.category.meldingstype.meldingstypeId,
        "beskrivelse": ownProps.description,
        "adresse": ownProps.address.display_name,
        "latitude": ownProps.address.lat,
        "longitude": ownProps.address.lon,
        "bilder": ownProps.pictures
    });
}

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'submit',
        signedIn: state.login.sub != null,
        user: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitMessageAction: bindActionCreators(submitMessage, dispatch)
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        editing: stateProps.editing,
        signedIn: stateProps.signedIn,
        submitMessage: bindSubmitMessageToMessage(dispatchProps.submitMessageAction, stateProps, ownProps)
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Submit)