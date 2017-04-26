import { connect } from 'react-redux'
import Category from '../../components/Message/Category'
import { changeStep } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'category',
        categories: state.message.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goto: () => dispatch(changeStep('category'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)