import React, { Component, PropTypes } from 'react'
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Image, Checkbox } from 'react-bootstrap'

import './RegisterUser.css'

import closeIcon from '../../images/lukk.svg'
import checked from '../../images/check-box-checked.svg'
import notChecked from '../../images/check-box.svg'

class RegisterUser extends Component {

    static propTypes = {
        registerUser: PropTypes.func.isRequired,
        onHide: PropTypes.func.isRequired,
        onShowLogin: PropTypes.func.isRequired
    }

    state = {
        email: '',
        approve: false,
        emailState: null,
        approveState: null,
        submitting: false,
        errorMessage: null
    }

    register = () => {
        if (this.validateState()) {
            this.setState({ submitting: true });
            this.props.registerUser(this.state.email)
                .then(this.success)
                .catch(this.failure);
        }
    }

    success = () => {
        this.props.onHide();
        this.props.onShowLogin();
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
        const { email, approve } = this.state;
        const validation = {
            emailState: email !== '' ? null : 'error',
            approveState: approve ? null : 'error'
        };
        this.setState(validation);
        return validation.emailState === null && validation.approveState === null;
    }

    render() {
        const { onHide } = this.props;
        const { email, approve } = this.state;
        const { emailState, approveState } = this.state;
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