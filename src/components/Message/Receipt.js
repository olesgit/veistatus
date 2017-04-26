import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

import './Receipt.css'

class Receipt extends Component {

    static propTypes = {
        acknowledge: PropTypes.func.isRequired,
        signedIn: PropTypes.bool.isRequired
    }

    render() {
        const { acknowledge, signedIn } = this.props;

        return (
            <div className="receipt-content">
                <h1>Takk for at du gjør byen bedre</h1>
                {signedIn && <p>Du vil få oppdateringer her når det skjer noe med saken din.</p>}
                <Button bsStyle="success" onClick={acknowledge}>OK</Button>
            </div>
        );
    }
}

export default Receipt