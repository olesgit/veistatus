import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from '../../components/Layout/Login'
import { login } from '../../actions/loginActions'

const mapDispatchToProps = (dispatch) => {
    return {
        login: bindActionCreators(login, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Login)