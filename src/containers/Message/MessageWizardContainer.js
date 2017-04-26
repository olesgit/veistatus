import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MessageWizard from '../../components/Message/MessageWizard'
import { locationSelected } from '../../actions/mapActions'
import { abort, changeStep } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        message: state.message,
        geodata: state.map.geodata,
        hideWelcome: state.message.hideWelcome
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        locationSeleted: locationSelected,
        abort: abort,
        goto: changeStep
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageWizard)