import React, { Component, PropTypes } from 'react'
import { Image } from 'react-bootstrap'

import './Icon.css'

class Icon extends Component {

    static propTypes = {
        src: PropTypes.string.isRequired,
        hover: PropTypes.string.isRequired
    }

    render() {
        const { src, hover } = this.props;

        return (
            <div className="icon">
                <Image className="bottom" src={hover} />
                <Image className="top" src={src} />
            </div>
        );
    }
}

export default Icon;