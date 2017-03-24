import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pictures from '../../components/Message/Pictures'
import { picturesSpecified, abort } from '../../actions/messageActions'
import { addFlashMessage } from "../../actions/FlashMessagesAction";

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'picture',
        pictures: state.message.picture
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        picturesSpecified: bindActionCreators(picturesSpecified, dispatch),
        addFlashMessage: bindActionCreators(addFlashMessage, dispatch),
        abort: bindActionCreators(abort, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures)