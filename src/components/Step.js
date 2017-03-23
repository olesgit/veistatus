import React, { PureComponent, PropTypes } from 'react';
import { Image } from 'react-bootstrap'

import './Step.css'

class Step extends PureComponent {

    static propTypes = {
        icon: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }

    render() {
        const { icon, text } = this.props;
        return (
            <div className="step-complete">
                <Image src={icon} />
                <span>{text}</span>
            </div>
        );
    }
}

export default Step;