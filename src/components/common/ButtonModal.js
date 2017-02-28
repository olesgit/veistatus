import React, {PropTypes} from 'react';
import {Button, Glyphicon, Modal} from 'react-bootstrap';

class ButtonModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);

        this.state = {
            showModal: false
        };
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    render() {
        return (
            <div>
                <Button className="bym-add-btn" onClick={this.open}>
                    <Glyphicon glyph="plus"/>
                    {this.props.buttonText}
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="pull-left">
                            <Button onClick={this.close}>Standard default</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

ButtonModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    modalTitle: PropTypes.string.isRequired
};

export default ButtonModal;