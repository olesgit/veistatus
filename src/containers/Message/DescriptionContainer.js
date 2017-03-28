import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Description from '../../components/Message/Description'
import { descriptionSpecified, abort, changeStep } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'description',
        description: state.message.description
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        descriptionSpecified: bindActionCreators(descriptionSpecified, dispatch),
        abort: bindActionCreators(abort, dispatch),
        goto: () => dispatch(changeStep('description'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)