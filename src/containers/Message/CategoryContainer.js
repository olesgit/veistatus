import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Category from '../../components/Message/Category'
import { categorySpecified, abort } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'category',
        category: state.message.category,
        categories: state.message.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categorySpecified: bindActionCreators(categorySpecified, dispatch),
        abort: bindActionCreators(abort, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)