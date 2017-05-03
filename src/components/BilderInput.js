import React, { Component, PropTypes } from 'react'
import { Image } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import ImagePreview from './ImagePreview'

import './BilderInput.css'

import addIcon from '../images/pluss.svg'
import addHoverIcon from '../images/pluss-hover.svg'

const MAX_IMAGE_SIZE = 10485760 //Max size in bytes - 10 MB

class BilderInput extends Component {

    static propTypes = {
        addFlashMessage: PropTypes.func.isRequired,
        pictures: PropTypes.array.isRequired,
        onDrop: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    }

    render() {
        const { pictures, onDrop, onDelete } = this.props;

        return (
            <div className="clearfix">
                {pictures.map(file => <ImagePreview key={file.uuid} file={file} onDelete={onDelete} />)}
                {pictures.length < 4 &&
                    <Dropzone className="bilder-dropzone bilder-thumbnail" onDrop={onDrop} preventDropOnDocument={true} maxSize={MAX_IMAGE_SIZE}>
                        <span className="bilder-dropzone-helper"></span>
                        <Image className="add" src={addIcon} alt='legg til bilde' />
                        <Image className="add hover" src={addHoverIcon} alt='legg til bilde' />
                    </Dropzone>
                }
            </div>
        );
    }
}

export default BilderInput;