import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Submit from '../../components/Message/Submit'
import { submitMessage } from '../../actions/messageActions'

function bindSubmitMessageToMessage(submitMessage, message) {
    return () => submitMessage({
        "innsenderNavn": null,
        "innsenderEpost": null,
        "meldingstypeId": message.category.meldingstype.meldingstypeId,
        "beskrivelse": message.description,
        "adresse": message.address.display_name,
        "latitude": message.address.lat,
        "longitude": message.address.lon,
        "bilder": message.pictures
    });
}

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'submit',
        message: state.message
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
        submitMessage: bindSubmitMessageToMessage(dispatchProps.submitMessageAction, stateProps.message)
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Submit)