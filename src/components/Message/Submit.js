import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

import './Submit.css'

class Submit extends Component {

    static propTypes = {
        editing: PropTypes.bool.isRequired,
        submitMessage: PropTypes.func.isRequired,
        submitted: PropTypes.func.isRequired
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
        const { editing } = this.props;
        const { submitting } = this.state;

        if (!editing) {
            return null;
        }

        const text = submitting ? "Sender inn..." : "Send inn";

        return (
            <div className="submit-content">
                <Button className="message-submit" bsStyle="success" block disabled={submitting} onClick={this.submit}>{text}</Button>
            </div>
        );
    }
}

export default Submit