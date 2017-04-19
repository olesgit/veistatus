import { connect } from 'react-redux'
import Welcome from '../../components/Message/Welcome'
import { changeStep } from '../../actions/messageActions'

const mapDispatchToProps = (dispatch) => {
    return {
        goto: () => dispatch(changeStep('address-map'))
    }
}

export default connect(null, mapDispatchToProps)(Welcome)