import { connect } from 'react-redux'
import RegisterUser from '../../components/Layout/RegisterUser'

const mapStateToProps = (state) => {
    return {
        //geodata: state.map.geodata
    }
}

export default connect(mapStateToProps)(RegisterUser)