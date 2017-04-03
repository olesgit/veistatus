import React, { Component, PropTypes } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import Step from '../Step'

import './Description.css'

import descriptionIcon from '../../images/beskrivelse.svg'

class Description extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        description: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        goto: PropTypes.func
    }

    static defaultProps = {
        editing: true
    }

    render() {
        const { editing, description, value, onChange, goto } = this.props;

        if (!editing && description == null) {
            return null;
        }

        if (!editing) {
            return <Step icon={descriptionIcon} text={description} goto={goto} />;
        }

        return (
            <FormGroup className="description-input-container" controlId="beskrivelse">
                <FormControl
                    className="description-input"
                    placeholder="Beskriv problemet"
                    componentClass="textarea"
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    rows={7}
                />
            </FormGroup>
        );
    }
}

export default Description