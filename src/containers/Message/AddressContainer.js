import { connect } from 'react-redux'
import Address from '../../components/Message/Address'
import { changeStep } from '../../actions/messageActions'

const mapStateToProps = (state) => {
    return {
        editing: state.message.step === 'address-map' || state.message.step === 'address',
        address: state.message.address
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goto: () => dispatch(changeStep('address')),
        showMap: () => dispatch(changeStep('address-map'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address)