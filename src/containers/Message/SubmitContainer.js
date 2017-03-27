import { connect } from 'react-redux'
import Submit from '../../components/Message/Submit'
import { submitMessage } from '../../actions/messageActions'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitMessage: () => dispatch(submitMessage(ownProps.message))
    }
}

export default connect(null, mapDispatchToProps)(Submit)