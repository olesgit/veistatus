import React, { PureComponent, PropTypes } from 'react';
import { Image } from 'react-bootstrap'
import ImagePreview from './ImagePreview'

import './StepBilder.css'


class StepBilder extends PureComponent {

    static propTypes = {
        icon: PropTypes.string.isRequired,
        pictures: PropTypes.array.isRequired,
        goto: PropTypes.func.isRequired
    }

    render() {
        const { icon, pictures, goto } = this.props;
        return (
            <div className="step-picture-complete clearfix" onClick={goto}>
                <Image src={icon} />
                <div>
                    {pictures.map(file => <ImagePreview key={file.uuid} className="step-picture-preview" file={file} />)}
                </div>
            </div>
        );
    }
}

export default StepBilder; 