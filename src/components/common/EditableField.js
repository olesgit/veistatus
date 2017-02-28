import React, { Component, PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';
import { FormGroup, InputGroup, Button, Glyphicon } from 'react-bootstrap';

import '../../css/common/EditableField.css';

class EditableField extends Component {

    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            editing: false,
            text: props.text
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.text !== nextProps) {
            this.setState({
                text: nextProps.text
            });
        }
    }

    click() {
        if (!this.state.editing) {
            this.setState({ editing: true });
        }
    }

    cancel() {
        this.setState({ editing: false, text: this.props.text });
    }

    submit(ev) {
        ev.preventDefault();
        this.setState({ editing: false });
        this.props.onSubmit(this.state.text);
    }

    handleChange(ev) {
        this.setState({
            text: ev.target.value
        });
    }

    renderEditing() {
        return (
            <form onSubmit={this.submit}>
                <FormGroup className="editable-field-form">
                    <InputGroup>
                        <Textarea autoFocus className="form-control editable-field-textarea" value={this.state.text} onChange={this.handleChange} />
                        <span className="input-group-btn editable-field-buttons">
                            <Button bsSize="small" onClick={this.cancel}><Glyphicon glyph="remove" className="editable-field-button-cancel" /></Button>
                            <Button bsSize="small" type="submit"><Glyphicon glyph="ok" className="editable-field-button-save" /></Button>
                        </span>
                    </InputGroup>
                </FormGroup>
            </form>
        );
    }

    renderNormal() {
        return (
            <FormGroup className="editable-field-form" onClick={this.click}>
                <InputGroup className="editable-field">
                    <Textarea className="form-control editable-field-textarea" value={this.state.text} onChange={() => {}}/>
                    <InputGroup.Addon className="editable-field-span">
                        <Glyphicon glyph="pencil" />
                    </InputGroup.Addon>
                </InputGroup>
            </FormGroup>
        );
    }

    render() {
        return this.state.editing
            ? this.renderEditing()
            : this.renderNormal();
    }
}

EditableField.propTypes = {
    text: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
};

export default EditableField;