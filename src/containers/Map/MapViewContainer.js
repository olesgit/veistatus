import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MapView from '../../components/Map/MapView'
import { locationSelected } from '../../actions/mapActions'

const mapStateToProps = (state) => {
    return {
        geodata: state.map.geodata
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectCoord: bindActionCreators(locationSelected, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)