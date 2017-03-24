import React, { PureComponent, PropTypes } from 'react';
import { Image } from 'react-bootstrap'

import './Step.css'
import './BilderInput.css'


class StepBilder extends PureComponent { 

    static propTypes = {
        icon: PropTypes.string.isRequired,
        pictures: PropTypes.array.isRequired
    }

    renderThumbnail(file) {
        return (
            <div key={file.name} style={{ 'width': '128px', 'height': '128px', 'backgroundColor': 'transparent', 'float': 'left', marginLeft: '10px' }}>
                <div className="input-group">
                    <img className="thumbnails" src={file.preview} alt='bilde' style={{ position: 'relative', 'zIndex': 1 }} />
                </div>
            </div>
        );
    }

    render() {
        const { icon, pictures } = this.props;
        return (
            <div className="step-complete clearfix">
                <Image src={icon} />
                <div style={{ height: 128, width: '100%', backgroundColor: 'transparent' }}>
                    {pictures.map(this.renderThumbnail)}
                </div>
            </div>
        );
    }
}

export default StepBilder; 