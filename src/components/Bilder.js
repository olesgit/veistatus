import React, { Component, PropTypes } from 'react'
import { Button, Image } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

import './Bilder.css'

class Bilder extends Component {

    static propTypes = {
        addFlashMessage: PropTypes.func.isRequired,
        pictures: PropTypes.array.isRequired,
        onDrop: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    }

    renderThumbnail(file) {
        return (
            <div key={file.name} style={{ 'width': '128px', 'height': '128px', 'backgroundColor': 'transparent', 'float': 'left', marginLeft: '10px' }}>
                <div className="input-group">
                    <img className="thumbnails" src={file.preview} alt='bilde' style={{ position: 'relative', 'zIndex': 1 }} />
                    <Button onClick={() => this.props.onDelete(file)} style={{
                        'color': 'black', padding: '0px',
                        'verticalAlign': 'middle', backgroundColor: 'red', border: 'none', top: '5px', left: '123px',
                        position: 'absolute', 'zIndex': 1000
                    }} >
                        <Image src={"slett_thumb.png"} style={{ position: 'absolute', right: '0px', top: '0px', backgroundColor: 'transparent' }} />
                    </Button>
                </div>
            </div>
        );
    }

    render() {
        const { pictures, onDrop } = this.props;

        return (
            <div className="bilder">
                <div id="image" style={{ backgroundColor: 'orange' }}>
                    <img src="Camera.png" alt='kategori' style={{ 'float': 'left', 'align': 'left', 'paddingLeft': '9px', 'paddingTop': '11px' }} />
                </div>
                <div id="texts" className="text-24px" style={{ 'color': 'black', 'float': 'initial', 'paddingLeft': '53px', 'paddingTop': '12px', backgroundColor: 'transparent' }}>
                    Last opp bilder…
                            </div>
                <div style={{ height: 128, width: '100%', backgroundColor: 'transparent', 'marginTop': '10px' }}>
                    {pictures.map(this.renderThumbnail)}
                    {pictures.length < 4 && <Dropzone onDrop={onDrop}
                        preventDropOnDocument={true}
                        maxSize={10485760}  //Max size in bytes - 10 MB
                        style={{ 'color': 'black', 'width': '128px', 'height': '128px', backgroundColor: 'white', 'float': 'left', marginLeft: '10px', 'borderStyle': 'dashed', 'borderWidth': '1px', 'borderColor': '#979797' }}
                        activeStyle={{ backgroundColor: 'green' }} >
                        <div className="centerPictureFrame">
                            <span className="centerPictureHelper"></span>
                            <img className="centerPictureImg" src="pluss.png" alt='legg til' height="36" />
                        </div>
                    </Dropzone>}
                </div>
            </div>
        );
    }
}

export default Bilder;