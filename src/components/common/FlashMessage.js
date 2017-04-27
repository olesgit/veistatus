import React, { Component, PropTypes } from 'react';
import classnames from "classnames";

import "./FlashMessage.css"

class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibile: true
        }
        this.onClick = this.onClick.bind(this);
    }
    componentWillMount() {
        setTimeout(() => {
            this.props.deleteFlashMessage(this.props.message.id);
        }, 5000);
    }
    componentWillUpdate() {
        this.setState({ visibile: false });
    }
    checkIfAlreadyExists() {
        if (this.props.message) {
            this.onClick();
        }
    }
    onClick() {
        this.props.deleteFlashMessage(this.props.message.id);
    }
    createAlertBootstrap(type, text) {
        return (
            this.state.visibile &&
            <div className={classnames('alert', {
                'alert-success': type === 'success',
                'alert-danger': type === 'error'
            }
            )}
            >
                <button onClick={this.onClick} className="close"><span>&times;</span></button>
                {text}
            </div>
        );
    }
    render() {
        const { type, text } = this.props.message;
        return (
            <div className="alert-container">
                {
                    this.createAlertBootstrap(type, text)
                }
            </div>
        )
    }
}
FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage;