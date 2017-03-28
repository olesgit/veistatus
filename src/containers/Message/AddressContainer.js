import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Address from '../../components/Message/Address'
import { locationSelected } from '../../actions/mapActions'
import { addressSpecified, changeStep } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'address',
        address: state.message.address,
        geodata: state.map.geodata
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addressSpecified: bindActionCreators(addressSpecified, dispatch),
        locationSeleted: bindActionCreators(locationSelected, dispatch),
        goto: () => dispatch(changeStep('address'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address)