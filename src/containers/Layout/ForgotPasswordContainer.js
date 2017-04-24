import { connect } from 'react-redux'
import ForgotPassword from '../../components/Layout/ForgotPassword'

const mapStateToProps = (state) => {
    return {
        //geodata: state.map.geodata
    }
}

export default connect(mapStateToProps)(ForgotPassword)