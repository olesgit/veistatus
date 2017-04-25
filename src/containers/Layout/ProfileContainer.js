import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Profile from '../../components/Layout/Profile'
import { changePassword } from '../../actions/loginActions'

const mapStateToProps = (state) => {
    return {
        brukerId: state.login.brukerId,
        email: state.login.sub
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: bindActionCreators(changePassword, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)