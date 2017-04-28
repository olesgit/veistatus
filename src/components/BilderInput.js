import React, { Component, PropTypes } from 'react'
import { Button, Image } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

import './BilderInput.css'

import addIcon from '../images/pluss.svg'
import addHoverIcon from '../images/pluss-hover.svg'
import deleteIcon from '../images/slett.svg'
import deleteHoverIcon from '../images/slett-hover.svg'

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
            <div key={file.uuid} className="bilder-preview bilder-thumbnail" style={{ backgroundImage: `url(${file.preview})` }}>
                <Button onClick={() => this.props.onDelete(file)}>
                    <Image width={25} height={25} className="del" src={deleteIcon} />
                    <Image width={25} height={25} className="del hover" src={deleteHoverIcon} />
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