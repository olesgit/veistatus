import { Marker } from 'react-leaflet'

class OpenMarker extends Marker {

    componentDidMount() {
        super.componentDidMount();
        this.leafletElement.openPopup();
    }
}

export default OpenMarker