import React, { Component, PropTypes } from 'react'
import { Button, FormGroup, FormControl } from 'react-bootstrap'
import Step from '../Step'

import './Description.css'
import descriptionIcon from '../../images/Camera.png'

class Description extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        description: PropTypes.string,
        descriptionSpecified: PropTypes.func
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
        // TODO Do not "next" if description is empty
        if (this.props.descriptionSpecified) {
            this.props.descriptionSpecified(this.state.description);
        }
    }

    cancel = () => {

    }

    render() {
        const { editing } = this.props;
        const { description } = this.state;

        if (!editing && !description) {
            return null;
        }

        if (!editing) {
            return <Step icon={descriptionIcon} text={description} />;
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
                <Button bsStyle="success" block onClick={this.next}>Neste</Button>
                <Button bsStyle="link" block onClick={this.cancel}>Avbryt</Button>
            </div>
        );
    }
}

export default Description