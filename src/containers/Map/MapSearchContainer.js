import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MapSearch from '../../components/Map/MapSearch'
import { locationSelected } from '../../actions/mapActions'

const mapStateToProps = (state) => {
    return {
        geodata: state.map.geodata,
        showSearch: state.message.step === 'welcome' || state.message.step === 'map',
        showMap: state.message.step === 'map'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        locationSeleted: bindActionCreators(locationSelected, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapSearch)