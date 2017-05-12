import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ForgotPassword from '../../components/Layout/ForgotPassword'
import { reset } from '../../actions/loginActions'

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: bindActionCreators(reset, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ForgotPassword)