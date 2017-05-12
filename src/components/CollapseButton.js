import classnames from 'classnames'
import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import Icon from './Icon'

import './CollapseButton.css'

import showIcon from '../images/collapse-show.svg'
import hideIcon from '../images/collapse-hide.svg'
import showHoverIcon from '../images/collapse-show-hover.svg'
import hideHoverIcon from '../images/collapse-hide-hover.svg'

class CollapseButton extends Component {

    static propTypes = {
        show: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        hidden: PropTypes.bool
    }

    static defaultProps = {
        hidden: false
    }

    render() {
        const { hidden, show, onClick } = this.props;
        const collapseIcon = show ? hideIcon : showIcon;
        const collapseHoverIcon = show ? hideHoverIcon : showHoverIcon;
        return (
            <div className={classnames("collapse-button-container", { "hidden": hidden })}>
                <div className="fill-remaining left">
                    <div id="left"></div>
                </div>
                <div className="fill-remaining right">
                    <div id="right"></div>
                </div>
                <Button id="middle" className="collapse-button" onClick={onClick}>
                    <Icon src={collapseIcon} hover={collapseHoverIcon} />
                </Button>
            </div >
        );
    }
}

export default CollapseButton;