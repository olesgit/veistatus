import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pictures from '../../components/Message/Pictures'
import { changeStep } from '../../actions/messageActions'
import { addFlashMessage } from "../../actions/FlashMessagesAction";

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'pictures'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFlashMessage: bindActionCreators(addFlashMessage, dispatch),
        goto: () => dispatch(changeStep('pictures'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures)