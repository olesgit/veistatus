import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Description from '../../components/Message/Description'
import { descriptionSpecified } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'description',
        description: state.message.description
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categorySpecified: bindActionCreators(descriptionSpecified, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)