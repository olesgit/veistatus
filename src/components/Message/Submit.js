import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

import './Submit.css'

class Submit extends Component {

    static propTypes = {
        editing: PropTypes.bool.isRequired,
        signedIn: PropTypes.bool.isRequired,
        submitMessage: PropTypes.func.isRequired,
        submitted: PropTypes.func.isRequired,
        showLoginDialog: PropTypes.func.isRequired,
        showRegisterUser: PropTypes.func.isRequired
    }

    state = {
        submitting: false
    }

    submit = () => {
        this.setState({ submitting: true });
        this.props.submitMessage()
            .then(this.success)
            .catch(this.failure);
    }

    success = () => {
        this.props.submitted();
    }

    failure = () => {
        this.setState({ submitting: false });
    }

    render() {
        const { editing, signedIn, showLoginDialog, showRegisterUser } = this.props;
        const { submitting } = this.state;

        if (!editing) {
            return null;
        }

        const text = submitting ? "Sender inn..." : "Send inn";

        return (
            <div className="submit-content">
                {!signedIn &&
                    <p id="submit-login">
                        <a role="button" onClick={showLoginDialog}>Logg inn</a> eller <a role="button" onClick={showRegisterUser}>Registrer deg</a> for å følge innmeldt sak.
                    </p>
                }
                <Button className="message-submit" bsStyle="success" block disabled={submitting} onClick={this.submit}>{text}</Button>
                {!signedIn &&
                    <p id="submit-login-mobile">
                        <a role="button" onClick={showLoginDialog}>Logg inn</a> eller <a role="button" onClick={showRegisterUser}>Registrer deg</a> for å følge innmeldt sak.
                    </p>
                }
            </div>
        );
    }
}

export default Submit