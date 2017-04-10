import React, { Component, PropTypes } from 'react'
import { Button, Image } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

import './BilderInput.css'

import addIcon from '../images/pluss.svg'
import deleteIcon from '../images/slett.svg'

const MAX_IMAGE_SIZE = 10485760 //Max size in bytes - 10 MB

class BilderInput extends Component {

    static propTypes = {
        addFlashMessage: PropTypes.func.isRequired,
        pictures: PropTypes.array.isRequired,
        onDrop: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    }

    renderThumbnail = (file) => {
        return (
            <div key={file.name} className="picture-preview">
                <Image src={file.preview} />
                <Button onClick={() => this.props.onDelete(file)}>
                    <Image src={deleteIcon} />
                </Button>
            </div>
        );
    }

    render() {
        const { pictures, onDrop } = this.props;

        return (
            <div className="clearfix">
                {pictures.map(this.renderThumbnail)}
                {pictures.length < 4 &&
                    <Dropzone className="bilder-dropzone" onDrop={onDrop} preventDropOnDocument={true} maxSize={MAX_IMAGE_SIZE}>
                        <div className="centerPictureFrame">
                            <span className="centerPictureHelper"></span>
                            <Image className="centerPictureImg" src={addIcon} alt='legg til bilde' />
                        </div>
                    </Dropzone>
                }
            </div>
        );
    }
}

export default BilderInput;