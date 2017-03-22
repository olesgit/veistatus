import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Address from '../../components/Message/Address'
import { addressSpecified } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'address',
        address: state.message.address,
        geodata: state.map.geodata
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addressSpecified: bindActionCreators(addressSpecified, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address)