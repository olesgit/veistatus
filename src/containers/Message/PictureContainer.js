import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pictures from '../../components/Inputs/picturePanel'
import { picturesSpecified } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'picture'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categorySpecified: bindActionCreators(picturesSpecified, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures)