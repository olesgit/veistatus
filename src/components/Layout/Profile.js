import React, { Component, PropTypes } from 'react'
import { Modal, Button, FormGroup, FormControl, HelpBlock, Image, Checkbox } from 'react-bootstrap'

import './Profile.css'

import closeIcon from '../../images/lukk.svg'
//import checked from '../../images/check-box-checked.svg'
import notChecked from '../../images/check-box.svg'
import emailIcon from '../../images/e-post.svg'
import lockIcon from '../../images/passord.svg'

const defaultState = {
    password: '',
    passwordRepeat: '',
    passwordState: null,
    passwordRepeatState: null,
    submitting: false,
    errorMessage: null
}

class Profile extends Component {

    static propTypes = {
        brukerId: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        changePassword: PropTypes.func.isRequired,
        onHide: PropTypes.func.isRequired
    }

    state = defaultState

    changePassword = () => {
        if (this.validateState()) {
            this.setState({ submitting: true });
            this.props.changePassword(this.props.brukerId, this.state.password)
                .then(this.success)
                .catch(this.failure);
        }
    }

    success = () => {
        this.setState(defaultState);
    }

    failure = (errorMessage) => {
        this.setState({ submitting: false, errorMessage: errorMessage });
    }

    cancel = () => {
        this.props.onHide();
    }

    handleChange = (ev, key) => {
        this.setState({ [key]: ev.target.value });
    }

    handleCheckboxChange = (key) => {
        this.setState({ [key]: !this.state[key] });
    }

    validateState = () => {
        const { password, passwordRepeat } = this.state;
        const validation = {
            passwordState: password !== '' ? null : 'error',
            passwordRepeatState: password !== '' && passwordRepeat === password ? null : 'error'
        };
        this.setState(validation);
        return validation.passwordState === null && validation.passwordRepeatState === null;
    }

    render() {
        const { onHide } = this.props;
        const { password, passwordRepeat } = this.state;
        const { passwordState, passwordRepeatState } = this.state;
        const { submitting, errorMessage } = this.state;

        const saveText = submitting ? "Lagrer endringer..." : "Lagre endringer";

        return (
            <Modal id="profile-dialog" show={true} onHide={onHide} backdrop="static" bsSize="large">
                <Modal.Header>
                    <button type="button" className="close" aria-label="Close" onClick={onHide}>
                        <Image src={closeIcon} />
                    </button>
                    <Modal.Title>Din profil</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h2>E-post</h2>
                    <FormGroup controlId="epost" className="clearfix">
                        <div className="col-left">
                            <Image src={emailIcon} />
                        </div>
                        <div className="col-right">
                            <FormControl type="email" defaultValue={this.props.email} disabled={true} />
                        </div>
                    </FormGroup>

                    <h2>Bytt passord</h2>
                    {errorMessage && <HelpBlock className="has-error no-icon-input" style={{ color: "#a94442" }}>{errorMessage}</HelpBlock>}
                    <FormGroup controlId="passord" className="clearfix" validationState={passwordState}>
                        <div className="col-left">
                            <Image src={lockIcon} />
                        </div>
                        <div className="col-right">
                            <FormControl type="password" placeholder="Nytt passord" value={password} onChange={(ev) => this.handleChange(ev, 'password')} />
                            <FormControl.Feedback />
                        </div>
                    </FormGroup>
                    <FormGroup controlId="passord-gjenta" className="clearfix" validationState={passwordRepeatState}>
                        <div className="col-left">
                            <Image src={lockIcon} />
                        </div>
                        <div className="col-right">
                            <FormControl type="password" placeholder="Gjenta nytt passord" value={passwordRepeat} onChange={(ev) => this.handleChange(ev, 'passwordRepeat')} />
                            <FormControl.Feedback />
                        </div>
                    </FormGroup>

                    <h2>Varsler</h2>
                    <Checkbox id="godta-betingelsene" className="no-icon-input" defaultChecked={false} disabled={true}>
                        <Image width={15} height={15} src={notChecked} />
                        Oppdateringsvarsel
                    </Checkbox>

                </Modal.Body>
                <Modal.Footer>
                    <Button block bsStyle="primary" onClick={this.changePassword} disabled={submitting}>{saveText}</Button>
                    <Button block bsStyle="link" onClick={this.cancel} disabled={submitting}>Avbryt</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default Profile