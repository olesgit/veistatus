import React, { Component, PropTypes } from 'react'
import { Button, FormGroup } from 'react-bootstrap'
import BilderInput from '../BilderInput'
const uuidV4 = require('uuid/v4');
import StepBilder from '../StepBilder'

import cameraIcon from '../../images/kamera.svg'


class Pictures extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        pictures: PropTypes.array,
        picturesSpecified: PropTypes.func,
        addFlashMessage: PropTypes.func
    }

    static defaultProps = {
        editing: true,
        pictures: []
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

    cancel = () => {

    }

    onDrop = (acceptedFiles, rejectedFiles) => {


console.log(acceptedFiles);

        var filesToAdd = this.state.pictures;

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
                inputfile.Name = inputfile.name;
                inputfile.Size = inputfile.size;
                inputfile.Type = inputfile.type;
                inputfile.LastModified = inputfile.lastModified;
                filesToAdd.push(inputfile);
            }
        })

        this.setState({ pictures: filesToAdd });
    }

    onDelete = (file) => {
        let filesRemaining = this.state.pictures.filter(statefile => statefile.uuid !== file.uuid);
        this.setState({ pictures: filesRemaining });
    }

    render() {

        const { editing, addFlashMessage } = this.props;
        const { pictures } = this.state;

        if (!editing && !pictures) {
            return null;
        }

        if (!editing) {
            return <StepBilder icon={cameraIcon} pictures={this.props.pictures} />;
        }

        if (!editing) {
            return null;
        }

        return (
            <div>
                <FormGroup className="description-input-container" controlId="beskrivelse">
                    <BilderInput pictures={this.state.pictures} onDrop={this.onDrop} onDelete={this.onDelete} addFlashMessage={addFlashMessage} />
                </FormGroup>
                <Button bsStyle="primary" block onClick={this.next}>Neste</Button>
                <Button bsStyle="link" block onClick={this.cancel}>Avbryt</Button>
            </div>
        );
    }
}

export default Pictures