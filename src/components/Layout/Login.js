import React, { Component, PropTypes } from 'react'
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Image } from 'react-bootstrap'

import './Login.css'

import closeIcon from '../../images/lukk.svg'

class Login extends Component {

    static propTypes = {
        login: PropTypes.func.isRequired,
        onHide: PropTypes.func.isRequired,
        onForgotPassword: PropTypes.func.isRequired
    }

    state = {
        email: '',
        password: '',
        emailState: null,
        passwordState: null,
        submitting: false,
        errorMessage: null
    }

    login = () => {
        if (this.validateState()) {
            this.setState({ submitting: true });
            this.props.login(this.state.email, this.state.password)
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

    forgotPassword = (ev) => {
        this.props.onHide();
        this.props.onForgotPassword(ev);
    }

    handleChange = (ev, key) => {
        this.setState({ [key]: ev.target.value });
    }

    validateState = () => {
        const { email, password } = this.state;
        const validation = {
            emailState: email !== '' ? null : 'error',
            passwordState: password !== '' ? null : 'error'
        };
        this.setState(validation);
        return validation.emailState === null && validation.passwordState === null;
    }

    render() {
        const { onHide } = this.props;
        const { email, password, emailState, passwordState, submitting, errorMessage } = this.state;

        const loginText = submitting ? "Logger inn..." : "Logg inn"

        return (
            <Modal className="ok" show={true} onHide={onHide} backdrop="static" bsSize="large">
                <Modal.Header>
                    <button type="button" className="close" aria-label="Close" onClick={onHide}>
                        <Image src={closeIcon} />
                    </button>
                    <Modal.Title>Logg inn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <HelpBlock className="has-error" style={{ color: "#a94442" }}>{errorMessage}</HelpBlock>}
                    <FormGroup controlId="epost" validationState={emailState}>
                        <ControlLabel>E-postadresse</ControlLabel>
                        <FormControl type="email" value={email} onChange={(ev) => this.handleChange(ev, 'email')} />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup controlId="passord" validationState={passwordState}>
                        <ControlLabel>Passord</ControlLabel>
                        <FormControl type="password" value={password} onChange={(ev) => this.handleChange(ev, 'password')} />
                        <FormControl.Feedback />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button block bsStyle="success" onClick={this.login} disabled={submitting}>{loginText}</Button>
                    <Button block bsStyle="link" onClick={this.forgotPassword}>Glemt passord?</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default Login