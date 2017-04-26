import { connect } from 'react-redux'
import Description from '../../components/Message/Description'
import { changeStep } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'description'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goto: () => dispatch(changeStep('description'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)