import React, { PureComponent, PropTypes } from 'react';
import { Image } from 'react-bootstrap'

import './StepBilder.css'


class StepBilder extends PureComponent {

    static propTypes = {
        icon: PropTypes.string.isRequired,
        pictures: PropTypes.array.isRequired
    }

    renderThumbnail(file) {
        return (
            <div key={file.name} className="step-picture-preview">
                <Image src={file.preview} />
            </div>
        );
    }

    render() {
        const { icon, pictures } = this.props;
        return (
            <div className="step-complete clearfix">
                <Image src={icon} />
                <div>
                    {pictures.map(this.renderThumbnail)}
                </div>
            </div>
        );
    }
}

export default StepBilder; 