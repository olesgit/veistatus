import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../../components/Layout/Header'
import { logout } from '../../actions/loginActions'

const mapStateToProps = (state) => {
    return {
        signedIn: state.login.sub != null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: bindActionCreators(logout, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Header)