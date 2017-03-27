import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pictures from '../../components/Message/Pictures'
import { addFlashMessage } from "../../actions/FlashMessagesAction";

const mapDispatchToProps = (dispatch) => {
    return {
        addFlashMessage: bindActionCreators(addFlashMessage, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(Pictures)