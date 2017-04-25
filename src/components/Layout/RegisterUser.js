import React, { Component, PropTypes } from 'react'
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Image, Checkbox } from 'react-bootstrap'

import './RegisterUser.css'

import closeIcon from '../../images/lukk.svg'
import checked from '../../images/valgt-radiobutton.svg'
import notChecked from '../../images/ikke-valgt-radiobutton.svg'

class RegisterUser extends Component {

    static propTypes = {
        registerUser: PropTypes.func.isRequired,
        onHide: PropTypes.func.isRequired
    }

    state = {
        email: '',
        password: '',
        passwordRepeat: '',
        approve: false,
        emailState: null,
        passwordState: null,
        passwordRepeatState: null,
        approveState: null,
        submitting: false,
        errorMessage: null
    }

    register = () => {
        if (this.validateState()) {
            this.setState({ submitting: true });
            this.props.registerUser(this.state.email, this.state.password, this.state.passwordRepeat)
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

    handleCheckboxChange = (key) => {
        this.setState({ [key]: !this.state[key] });
    }

    validateState = () => {
        const { email, password, passwordRepeat, approve } = this.state;
        const validation = {
            emailState: email !== '' ? null : 'error',
            passwordState: password !== '' ? null : 'error',
            passwordRepeatState: password !== '' && passwordRepeat === password ? null : 'error',
            approveState: approve ? null : 'error'
        };
        this.setState(validation);
        return validation.emailState === null && validation.passwordState === null &&
            validation.passwordRepeatState === null && validation.approveState === null;
    }

    render() {
        const { onHide } = this.props;
        const { email, password, passwordRepeat, approve } = this.state;
        const { emailState, passwordState, passwordRepeatState, approveState } = this.state;
        const { submitting, errorMessage } = this.state;

        const registerText = submitting ? "Oppretter konto..." : "Opprett konto";

        return (
            <Modal id="register-user-dialog" show={true} onHide={onHide} backdrop="static" bsSize="large">
                <Modal.Header>
                    <button type="button" className="close" aria-label="Close" onClick={onHide}>
                        <Image src={closeIcon} />
                    </button>
                    <Modal.Title>Registrer deg</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Hvis du registrer deg får du:
                    </p>
                    <ul>
                        <li>Statusoppdateringer</li>
                        <li>Oversikt over innmeldte saker</li>
                        <li>Mulighet til å følge saker</li>
                    </ul>
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
                    <FormGroup controlId="passord-gjenta" validationState={passwordRepeatState}>
                        <ControlLabel>Gjenta Passord</ControlLabel>
                        <FormControl type="password" value={passwordRepeat} onChange={(ev) => this.handleChange(ev, 'passwordRepeat')} />
                        <FormControl.Feedback />
                    </FormGroup>
                    <Checkbox id="godta-betingelsene" checked={approve} onChange={() => this.handleCheckboxChange('approve')} validationState={approveState}>
                        <Image width={15} height={15} src={approve ? checked : notChecked} />
                        Jeg godtar <a href="">betingelsene</a>
                    </Checkbox>
                </Modal.Body>
                <Modal.Footer>
                    <Button block bsStyle="success" onClick={this.register} disabled={submitting}>{registerText}</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default RegisterUser