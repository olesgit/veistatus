import { connect } from 'react-redux'
import Header from '../../components/Layout/Header'

const mapStateToProps = (state) => {
    return {
        signedIn: state.login.sub != null
    }
}

export default connect(mapStateToProps)(Header)