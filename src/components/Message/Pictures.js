import React, { Component, PropTypes } from 'react'
import { Button, FormGroup } from 'react-bootstrap'
import Bilder from '../Bilder'
const uuidV4 = require('uuid/v4');

class Pictures extends Component {
    constructor(props, context) {
        super(props, context);

        this.onDrop = this.onDrop.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    static propTypes = {
        editing: PropTypes.bool,
        pictures: PropTypes.array = [],
        picturesSpecified: PropTypes.func,
        addFlashMessage: PropTypes.func.isRequired
    }

    static defaultProps = {
        editing: true
    }

    next = () => {
        // TODO Do not "next" if no pictures are added
        if (this.props.picturesSpecified) {
            this.props.picturesSpecified();
        }
    }

    cancel = () => {

    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0)
            this.props.addFlashMessage({ type: 'error', text: "Maksimum bilde størrelse er 10 MByte" });

        var filesToAdd = this.state.pictures;
        acceptedFiles.map(inputfile => {
            if (this.state.pictures.find(statefile => statefile.name === inputfile.name)) {
                this.props.addFlashMessage({ type: 'error', text: "En fil med dette navnet, " + inputfile.name + ", er allerede lagt til" });
                return null;
            }
            if (this.pictures.files.length === 4) {
                this.props.addFlashMessage({ type: 'error', text: "Maksimum antall filer er nådd" });
                return null;
            }
            else {
                inputfile.uuid = uuidV4();
                filesToAdd.push(inputfile);
            }
            return null;
        })

        this.setState({ pictures: filesToAdd });
    }

    onDelete(e, file) {
        let filesRemaining = this.state.pictures.filter(statefile => statefile.uuid !== file.uuid);
        //console.log(fRes);
        this.setState({ pictures: filesRemaining });
    }

    render() {

        const { editing, pictures } = this.props;

        if (!editing && !pictures) {
            return null;
        }

        if (!editing) {
            return null;
        }

        return (
            <div>
                <FormGroup className="description-input-container" controlId="beskrivelse">
                    <Bilder pictures={this.state.pictures} /*onDrop={this.onDrop} onDelete={this.onDelete}*/ addFlashMessage={this.props.addFlashMessage} /> 
                </FormGroup>
                <Button bsStyle="primary" block onClick={this.next}>Neste</Button>
                <Button bsStyle="link" block onClick={this.cancel}>Avbryt</Button>
            </div>
        );
    }
}

export default Pictures