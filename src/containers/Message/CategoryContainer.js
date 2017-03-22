import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Category from '../../components/Message/Category'
import { categorySpecified } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'category',
        category: state.message.category,
        categories: [] // TODO
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categorySpecified: bindActionCreators(categorySpecified, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)