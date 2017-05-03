import classnames from 'classnames'
import React, { Component, PropTypes } from 'react';
import { Button, Image } from 'react-bootstrap'
import EXIF from 'exif-js'

import './ImagePreview.css'

import deleteIcon from '../images/slett.svg'
import deleteHoverIcon from '../images/slett-hover.svg'

class ImagePreview extends Component {

    static propTypes = {
        className: PropTypes.string,
        file: PropTypes.object.isRequired,
        onDelete: PropTypes.func
    }

    state = {}

    componentDidMount() {
        try {
            var reader = new FileReader();
            reader.onloadend = ({ target }) => {
                var exif = EXIF.readFromBinaryFile(target.result);
                if (exif.Orientation !== 1) {
                    this.setState(calcRotation(exif.Orientation));
                }
            }
            reader.readAsArrayBuffer(this.props.file);
        } catch (e) { console.log(e); }
    }

    render() {
        const { file, className, onDelete } = this.props;
        const { transform } = this.state;
        return (
            <div className={classnames(className, "bilder-preview")}>
                <div className="bilder-thumbnail" style={{ backgroundImage: `url(${file.preview})`, transform: transform }}></div>
                {onDelete &&
                    <Button onClick={() => onDelete(file)}>
                        <Image width={25} height={25} className="del" src={deleteIcon} />
                        <Image width={25} height={25} className="del hover" src={deleteHoverIcon} />
                    </Button>
                }
            </div>
        );
    }
}

export default ImagePreview;

function calcRotation(orientation) {
    switch (orientation) {
        case 2:
            // horizontal flip
            return ({
                transform: `scale(-1, 1)`
            });
        case 3:
            // 180° rotate left
            return ({
                transform: `rotate(-180deg)`
            });
        case 4:
            // vertical flip
            return ({
                transform: `scale(1, -1)`
            });
        case 5:
            // vertical flip + 90 rotate right
            return ({
                transform: `rotate(90deg) scale(1, -1)`
            });
        case 6:
            // 90° rotate right
            return ({
                transform: `rotate(90deg)`
            });
        case 7:
            // horizontal flip + 90 rotate right
            return ({
                transform: `rotate(90deg) scale(-1, 1)`
            });
        case 8:
            // 90° rotate left
            return ({
                transform: `rotate(-90deg)`
            });
        default:
            return {};
    }
}