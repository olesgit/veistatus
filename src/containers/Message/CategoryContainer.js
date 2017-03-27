import { connect } from 'react-redux'
import Category from '../../components/Message/Category'

const mapStateToProps = (state) => {
    return {
        categories: state.message.categories
    }
}

export default connect(mapStateToProps)(Category)