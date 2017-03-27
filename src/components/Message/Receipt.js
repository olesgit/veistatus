import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

import './Receipt.css'

class Receipt extends Component {

    static propTypes = {
        acknowledged: PropTypes.func.isRequired
    }

    render() {
        const { acknowledged } = this.props;

        return (
            <div>
                <h1>Takk for at du gjør byen bedre.</h1>
                <Button bsStyle="success" onClick={acknowledged}>OK</Button>
            </div>
        );
    }
}

export default Receipt