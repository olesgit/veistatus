import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

import './Receipt.css'

class Receipt extends Component {

    static propTypes = {
        acknowledge: PropTypes.func.isRequired
    }

    render() {
        const { acknowledge } = this.props;

        return (
            <div className="receipt-content">
                <h1>Takk for at du gjør byen bedre.</h1>
                <Button bsStyle="success" onClick={acknowledge}>OK</Button>
            </div>
        );
    }
}

export default Receipt