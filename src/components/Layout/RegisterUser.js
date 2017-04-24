import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

//import './RegisterUser.css'

class RegisterUser extends Component {

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrer deg</Modal.Title>
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

export default RegisterUser