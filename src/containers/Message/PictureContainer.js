import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pictures from '../../components/Message/Pictures'
import { picturesSpecified } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'picture'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        picturesSpecified: bindActionCreators(picturesSpecified, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures)