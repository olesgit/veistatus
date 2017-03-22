import React, { Component, PropTypes } from 'react'
import { Button, FormGroup, FormControl } from 'react-bootstrap'

import './Description.css'

class Description extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        description: PropTypes.string,
        descriptionAdded: PropTypes.func
    }

    static defaultProps = {
        description: '',
        editing: true
    }

    state = {
        description: this.props.description || ''
    }

    handleChange = (event) => {
        this.setState({ description: event.target.value });
    }

    next = () => {
        // TODO ActionCreator => { type: "DESCRIPTION_ADDED", payload: description }
        // TODO Do not "next" if description is empty
        if (this.props.descriptionAdded) {
            this.props.descriptionAdded(this.state.description);
        }
    }

    cancel = () => {

    }

    render() {
        const { editing, description } = this.state;

        if (!editing && !description) {
            return null;
        }

        if (!editing) {
            return null;
        }

        return (
            <div>
                <FormGroup className="description-input-container" controlId="beskrivelse">
                    <FormControl
                        className="description-input"
                        placeholder="Beskriv problemet"
                        componentClass="textarea"
                        value={description}
                        onChange={this.handleChange}
                        rows={7}
                    />
                </FormGroup>
                <Button bsStyle="primary" block onClick={this.next}>Neste</Button>
                <Button bsStyle="link" block onClick={this.cancel}>Avbryt</Button>
            </div>
        );
    }
}

export default Description