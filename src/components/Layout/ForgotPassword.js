import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

//import './ForgotPassword.css'

class ForgotPassword extends Component {

    render() {
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Glemt passord</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Epost...
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default ForgotPassword