import React, { PureComponent, PropTypes } from 'react';
import { Image } from 'react-bootstrap'

import './Step.css'

class Step extends PureComponent {

    static propTypes = {
        icon: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        goto: PropTypes.func.isRequired
    }

    render() {
        const { icon, text, goto } = this.props;
        return (
            <div className="step-complete clearfix" onClick={goto}>
                <Image src={icon} />
                <div>
                    <span>{text}</span>
                </div>
            </div>
        );
    }
}

export default Step; 