import React, { Component, PropTypes } from 'react'
import { Button, FormGroup, Image } from 'react-bootstrap'
import BilderInput from '../BilderInput'
import StepBilder from '../StepBilder'
import uuidV4 from 'uuid/v4'

import './Pictures.css'

import cameraIcon from '../../images/kamera.svg'


class Pictures extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        pictures: PropTypes.array,
        picturesSpecified: PropTypes.func,
        addFlashMessage: PropTypes.func,
        abort: PropTypes.func
    }

    static defaultProps = {
        editing: true
    }

    state = {
        pictures: this.props.pictures
    }

    next = () => {
        // TODO Do not "next" if no pictures are added
        if (this.props.picturesSpecified) {
            this.props.picturesSpecified(this.state.pictures);
        }
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        const pictures = this.state.pictures ? this.state.pictures : [];
        const filesToAdd = [...pictures];

        if (rejectedFiles.length > 0) {
            this.props.addFlashMessage({ type: 'error', text: "Maksimum bilde størrelse er 10 MByte" });
        }

        acceptedFiles.forEach(inputfile => {
            if (filesToAdd.find(statefile => statefile.name === inputfile.name)) {
                this.props.addFlashMessage({ type: 'error', text: "En fil med dette navnet, " + inputfile.name + ", er allerede lagt til" });
            }
            else if (filesToAdd.length === 4) {
                this.props.addFlashMessage({ type: 'error', text: "Maksimum antall filer er nådd" });
            }
            else {
                inputfile.uuid = uuidV4();
                filesToAdd.push(inputfile);
            }
        })

        this.setState({ pictures: filesToAdd });
    }

    onDelete = (file) => {
        const filesRemaining = this.state.pictures.filter(statefile => statefile.uuid !== file.uuid);
        this.setState({ pictures: filesRemaining });
    }

    render() {

        const { editing, addFlashMessage, abort } = this.props;
        const { pictures } = this.state;

        if (!editing && !pictures) {
            return null;
        }

        if (!editing) {
            return <StepBilder icon={cameraIcon} pictures={this.props.pictures} />;
        }

        return (
            <div className="pictures-content">
                <FormGroup className="pictures-input-container" controlId="bilder">
                    <div className="pictures-input-header">
                        <Image src={cameraIcon} />
                        <span>Last opp bilder…</span>
                    </div>
                    <BilderInput pictures={this.state.pictures || []} onDrop={this.onDrop} onDelete={this.onDelete} addFlashMessage={addFlashMessage} />
                </FormGroup>
                <Button bsStyle="success" block onClick={this.next}>Neste</Button>
                <Button bsStyle="link" block onClick={abort}>Avbryt</Button>
            </div>
        );
    }
}

export default Pictures