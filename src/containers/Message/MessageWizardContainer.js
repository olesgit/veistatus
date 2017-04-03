import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MessageWizard from '../../components/Message/MessageWizard'
import { locationSelected } from '../../actions/mapActions'
import { addressSpecified, categorySpecified } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        message: state.message,
        geodata: state.map.geodata,
        hideWelcome: state.message.hideWelcome
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addressSpecified: addressSpecified,
        categorySpecified: categorySpecified,
        locationSeleted: locationSelected,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageWizard)