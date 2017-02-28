import React, {Component, PropTypes} from 'react';
import {Modal, Button} from 'react-bootstrap';

class ConfirmModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveAndClose = this.saveAndClose.bind(this);

        this.state = this.initialState();
    }

    initialState() {
        return {
            open: true,
        };
    }

    openModal() {
        this.setState({open: true});
    }

    closeModal() {
        this.props.onCancel();
        this.setState({open: false});
    }

    saveAndClose() {
        this.setState({ open: false });
        this.props.onConfirm();
    }

    render() {
        return (
            <div>
                <Modal show={this.state.open} onHide={this.closeModal} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title><strong>{this.props.modalTitle}</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.bodyText}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="pull-left" bsSize="large" bsStyle="link" onClick={this.closeModal}>Avbryt
                        </Button>
                        <Button className="pull-left" bsSize="large" type="submit"
                            onClick={this.saveAndClose}>{this.props.confirmText}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

ConfirmModal.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmText: PropTypes.string.isRequired,
    modalTitle: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired
};

export default ConfirmModal;