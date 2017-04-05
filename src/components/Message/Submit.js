import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

import './Submit.css'

class Submit extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        submitMessage: PropTypes.func
    }

    static defaultProps = {
        editing: true
    }

    submit = () => {
        if (this.props.submitMessage) {
            this.props.submitMessage();
        }
    }

    render() {
        const { editing } = this.props;

        if (!editing) {
            return null;
        }

        return (
            <Button className="message-submit" bsStyle="success" block onClick={this.submit}>Send inn</Button>
        );
    }
}

export default Submit