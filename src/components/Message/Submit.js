import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

class Submit extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        sumbitMessage: PropTypes.func,
        abort: PropTypes.func.isRequired
    }

    static defaultProps = {
        editing: true
    }

    next = () => {
        if (this.props.sumbitMessage) {
            this.props.sumbitMessage();
        }
    }

    render() {
        const { editing, abort } = this.props;

        if (!editing) {
            return null;
        }

        return (
            <div>
                <Button bsStyle="success" block onClick={this.next}>Send inn</Button>
                <Button bsStyle="link" block onClick={abort}>Avbryt</Button>
            </div>
        );
    }
}

export default Submit