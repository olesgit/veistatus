import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Receipt from '../../components/Message/Receipt'
import { acknowledge } from '../../actions/messageActions'

const mapDispatchToProps = (dispatch) => {
    return {
        acknowledge: bindActionCreators(acknowledge, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Receipt)