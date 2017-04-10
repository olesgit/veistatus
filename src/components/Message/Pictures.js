import React, { Component, PropTypes } from 'react'
import { FormGroup, Image } from 'react-bootstrap'
import BilderInput from '../BilderInput'
import StepBilder from '../StepBilder'
import uuidV4 from 'uuid/v4'

import './Pictures.css'

import cameraIcon from '../../images/kamera.svg'

class Pictures extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        pictures: PropTypes.array,
        value: PropTypes.array,
        onChange: PropTypes.func,
        addFlashMessage: PropTypes.func,
        goto: PropTypes.func
    }

    static defaultProps = {
        editing: true
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        const value = this.props.value ? this.props.value : [];
        const filesToAdd = [...value];

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

        this.props.onChange(filesToAdd);
    }

    onDelete = (file) => {
        const filesRemaining = this.props.value.filter(statefile => statefile.uuid !== file.uuid);
        this.props.onChange(filesRemaining);
    }

    render() {

        const { editing, addFlashMessage, value, pictures, goto } = this.props;

        if (!editing && !pictures) {
            return null;
        }

        if (!editing) {
            return <StepBilder icon={cameraIcon} pictures={pictures} goto={goto} />;
        }

        return (
            <div className="pictures-content">
                <FormGroup className="pictures-input-container" controlId="bilder">
                    <div className="pictures-input-header">
                        <Image src={cameraIcon} />
                        <span>Last opp bilder…</span>
                    </div>
                    <BilderInput pictures={value || []} onDrop={this.onDrop} onDelete={this.onDelete} addFlashMessage={addFlashMessage} />
                </FormGroup>
            </div>
        );
    }
}

export default Pictures