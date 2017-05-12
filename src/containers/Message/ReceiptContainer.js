import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Receipt from '../../components/Message/Receipt'
import { acknowledge } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        signedIn: state.login.sub != null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        acknowledge: bindActionCreators(acknowledge, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt)