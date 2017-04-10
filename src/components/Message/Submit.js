import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

import './Submit.css'

class Submit extends Component {

    static propTypes = {
        editing: PropTypes.bool.isRequired,
        submitMessage: PropTypes.func.isRequired,
        submitted: PropTypes.func.isRequired
    }

    submit = () => {
        this.props.submitMessage()
            .then(this.props.submitted);
    }

    render() {
        const { editing } = this.props;

        if (!editing) {
            return null;
        }

        return (
            <div className="submit-content">
                <Button className="message-submit" bsStyle="success" block onClick={this.submit}>Send inn</Button>
            </div>
        );
    }
}

export default Submit