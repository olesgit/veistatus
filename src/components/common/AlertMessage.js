
import React, { Component } from 'react'
import classnames from "classnames";

class AlertMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
            type: this.props.type
        }
        this.onClick = this.onClick.bind(this);
    }
    componentWillMount() {
        if (this.state.type.lenght>0) {
            this.setState({ visibility: true });
        }
    }

    onClick() {
        this.setState({ visibility: false });
    }
    setTimer() {
        setTimeout(() => { this.setState({ visibility: false }) }, 3000);
    }
    render() {
        var msg = '';
        //const fade = this.state.fading ? "fade in": "fade out" ;
        const type = this.props.type;
        if (type === "success") {
            msg = this.props.message.data;
        }
        else if (type === "danger") {
            msg = this.props.message;
        }
        const notEmpty = this.props.type.length > 0 ? true : false;
        return (

            this.state.visibility && notEmpty &&
            <div className={classnames('alert', {
                'alert-success': type === 'success',
                'alert-danger': type === 'danger'
            }
            )}>
                <button onClick={this.onClick} className="close"><span>&times;</span></button>
                {msg.responseMessage}
                {this.setTimer()}
            </div>

        );
    }
}

export default AlertMessage