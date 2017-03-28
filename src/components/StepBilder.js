import React, { PureComponent, PropTypes } from 'react';
import { Image } from 'react-bootstrap'

import './StepBilder.css'


class StepBilder extends PureComponent {

    static propTypes = {
        icon: PropTypes.string.isRequired,
        pictures: PropTypes.array.isRequired,
        goto: PropTypes.func.isRequired
    }

    renderThumbnail(file) {
        return (
            <div key={file.uuid} className="step-picture-preview">
                <Image src={file.preview} />
            </div>
        );
    }

    render() {
        const { icon, pictures, goto } = this.props;
        return (
            <div className="step-complete clearfix" onClick={goto}>
                <Image src={icon} />
                <div>
                    {pictures.map(this.renderThumbnail)}
                </div>
            </div>
        );
    }
}

export default StepBilder; 