import React, { Component, PropTypes } from 'react'
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Image } from 'react-bootstrap'

import './ForgotPassword.css'

import closeIcon from '../../images/lukk.svg'

class ForgotPassword extends Component {

    static propTypes = {
        resetPassword: PropTypes.func.isRequired,
        onHide: PropTypes.func.isRequired
    }

    state = {
        email: '',
        emailState: null,
        submitting: false,
        errorMessage: null
    }

    reset = () => {
        if (this.validateState()) {
            this.setState({ submitting: true });
            this.props.resetPassword(this.state.email)
                .then(this.success)
                .catch(this.failure);
        }
    }

    success = () => {
        this.props.onHide();
    }

    failure = (errorMessage) => {
        this.setState({ submitting: false, errorMessage: errorMessage });
    }

    handleChange = (ev, key) => {
        this.setState({ [key]: ev.target.value });
    }

    validateState = () => {
        const { email } = this.state;
        const validation = {
            emailState: email !== '' ? null : 'error'
        };
        this.setState(validation);
        return validation.emailState === null;
    }

    render() {
        const { onHide } = this.props;
        const { email, emailState, submitting, errorMessage } = this.state;

        const loginText = submitting ? "Tilbakestiller passord..." : "Tilbakestill passord";

        return (
            <Modal id="forgot-password-dialog" className="ok" show={true} onHide={onHide} backdrop="static" bsSize="large">
                <Modal.Header>
                    <button type="button" className="close" aria-label="Close" onClick={onHide}>
                        <Image src={closeIcon} />
                    </button>
                    <Modal.Title>Glemt passord</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <HelpBlock className="has-error" style={{ color: "#a94442" }}>{errorMessage}</HelpBlock>}
                    <FormGroup controlId="epost" validationState={emailState}>
                        <ControlLabel>E-postadresse</ControlLabel>
                        <FormControl type="email" value={email} onChange={(ev) => this.handleChange(ev, 'email')} />
                        <FormControl.Feedback />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button block bsStyle="success" onClick={this.reset} disabled={submitting}>{loginText}</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default ForgotPassword