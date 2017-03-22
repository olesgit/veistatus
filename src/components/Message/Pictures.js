import React, { Component, PropTypes } from 'react'
import { Button, FormGroup } from 'react-bootstrap'
import Bilder from '../Bilder'

class Pictures extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        pictures: PropTypes.array,
        picturesSpecified: PropTypes.func
    }

    static defaultProps = {
        editing: true
    }

    next = () => {
        // TODO Do not "next" if no pictures are added
        if (this.props.picturesSpecified) {
            this.props.picturesSpecified([]);
        }
    }

    cancel = () => {

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
                    <Bilder />
                </FormGroup>
                <Button bsStyle="primary" block onClick={this.next}>Neste</Button>
                <Button bsStyle="link" block onClick={this.cancel}>Avbryt</Button>
            </div>
        );
    }
}

export default Pictures