import React, { PureComponent, PropTypes } from 'react';

class StaticStep extends PureComponent {

    static propTypes = {
        icon: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }

    render() {
        const { icon, text } = this.props;
        return (
            <div className="step-static">
                <img src={icon} alt="kategori" />
                <span>{text}</span>
            </div>
        );
    }
}

export default StaticStep;