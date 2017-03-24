import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Button, Collapse, Image } from 'react-bootstrap'
import AddressContainer from '../../containers/Message/AddressContainer'
import CategoryContainer from '../../containers/Message/CategoryContainer'
import PictureContainer from '../../containers/Message/PictureContainer'
import DescriptionContainer from '../../containers/Message/DescriptionContainer'
import SubmitContainer from '../../containers/Message/SubmitContainer'
import ReceiptContainer from '../../containers/Message/ReceiptContainer'

import Welcome from './Welcome'

import './MessageWizard.css'
import showIcon from '../../images/collapse-show.svg'
import hideIcon from '../../images/collapse-hide.svg'

function checkStep(step, ...stepsToCheck) {
    return _.includes(stepsToCheck, step);
}

class MessageWizard extends Component {

    static propTypes = {
        step: PropTypes.string
    }

    static defaultProps = {
        step: 'welcome'
    }

    state = {
        open: true
    }

    toggleCollapse = () => {
        this.setState({ open: !this.state.open });
    }

    renderWelcome(step) {
        if (checkStep(step, 'welcome')) {
            return <Welcome />
        }
    }

    renderSteps(step) {
        if (checkStep(step, 'address', 'category', 'picture', 'description', 'submit')) {
            return ([
                <AddressContainer key="address-step" />,
                <CategoryContainer key="category-step" />,
                <PictureContainer key="pictures-step" />,
                <DescriptionContainer key="description-step" />,
                <SubmitContainer key="submit-step" />
            ]);
        }
    }

    renderReceipt(step) {
        if (checkStep(step, 'receipt')) {
            return <ReceiptContainer />;
        }
    }

    render() {
        const { step } = this.props;
        const { open } = this.state;

        const hideCollapse = !checkStep(step, 'welcome', 'receipt', 'address');
        const collapseIcon = open ? hideIcon : showIcon;

        const buttonClasses = classNames('message-collapse', { hidden: hideCollapse });

        return (
            <div>
                <Collapse in={open}>
                    <div className="message-container">
                        <div className="message-content">
                            {this.renderWelcome(step)}
                            {this.renderSteps(step)}
                            {this.renderReceipt(step)}
                        </div>
                    </div>
                </Collapse>
                <div style={{ textAlign: 'center' }}>
                    <Button className={buttonClasses} onClick={this.toggleCollapse}>
                        <Image src={collapseIcon} />
                    </Button>
                </div>
            </div>
        );
    }
}

export default MessageWizard;