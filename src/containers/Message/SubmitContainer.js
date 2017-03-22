import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Submit from '../../components/Message/Submit'
import { categorySpecified } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'submit'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categorySpecified: bindActionCreators(categorySpecified, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit)