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
            <div className="step-complete clearfix">
                <Image src={icon} />
                <div>
                    <span>{text}</span>
                </div>
            </div>
        );
    }
}

export default Step; 