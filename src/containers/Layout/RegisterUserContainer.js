import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RegisterUser from '../../components/Layout/RegisterUser'
import { register } from '../../actions/loginActions'

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: bindActionCreators(register, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(RegisterUser)