import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Button, Collapse, Image } from 'react-bootstrap'
import AddressContainer from '../../containers/Message/AddressContainer'
import CategoryContainer from '../../containers/Message/CategoryContainer'
import PicturesContainer from '../../containers/Message/PicturesContainer'
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
        geodata: PropTypes.object,
        hideWelcome: PropTypes.number,
        message: PropTypes.shape({
            step: PropTypes.string,
            address: PropTypes.object,
            category: PropTypes.object,
            pictures: PropTypes.array,
            description: PropTypes.string
        }).isRequired,
        locationSeleted: PropTypes.func.isRequired,
        addressSpecified: PropTypes.func.isRequired,
        categorySpecified: PropTypes.func.isRequired,
        picturesSpecified: PropTypes.func.isRequired,
        descriptionSpecified: PropTypes.func.isRequired
    }

    state = {
        show: true,
        address: this.props.message.address,
        category: this.props.message.category,
        pictures: this.props.message.pictures,
        description: this.props.message.description
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.geodata && this.props.geodata != nextProps.geodata) {
            this.setState({ show: true });
        }

        if (nextProps.hideWelcome !== this.props.hideWelcome) {
            this.setState({ show: false });
        }

        // Address is a special case where onChange may also be triggered in MapView or MapSearch
        if (nextProps.geodata !== this.state.address) {
            this.setState({ address: nextProps.geodata });
        }
    }

    toggleCollapse = () => {
        this.setState({ show: !this.state.show });
    }

    addressChanged = (value) => {
        this.props.locationSeleted(value);
        this.setState({ address: value });
    }

    categoryChanged = (value) => {
        this.setState({ category: value });
    }

    picturesChanged = (value) => {
        this.setState({ pictures: value });
    }

    descriptionChanged = (value) => {
        this.setState({ description: value });
    }

    nextDisabled() {
        return this.props.geodata == null
    }

    renderWelcome(step) {
        if (checkStep(step, 'welcome')) {
            return <Welcome />
        }
    }

    renderSteps(step) {
        if (checkStep(step, 'address', 'category', 'pictures', 'description', 'submit')) {
            return ([
                <AddressContainer key="address-step" value={this.state.address} onChange={this.addressChanged} />,
                <CategoryContainer key="category-step" value={this.state.category} onChange={this.categoryChanged} />,
                <PicturesContainer key="pictures-step" value={this.state.pictures} onChange={this.picturesChanged} />,
                <DescriptionContainer key="description-step" value={this.state.description} onChange={this.descriptionChanged} />,
                <SubmitContainer key="submit-step" />
            ]);
        }
    }

    renderReceipt(step) {
        if (checkStep(step, 'receipt')) {
            return <ReceiptContainer />;
        }
    }

    renderAbortButton() {
        var { step, abort } = this.props.message
        if (checkStep(step, 'category', 'pictures', 'description', 'submit')) {
            return (<Button bsStyle="link" block onClick={abort}>Avbryt</Button>)
        }
    }

    renderNextButton() {
        var { step } = this.props.message
        if (checkStep(step, 'address', 'category', 'pictures', 'description', 'submit')) {
            return (<Button bsStyle="success" block onClick={this.next} disabled={this.nextDisabled()}>
                {step === 'address' ? "Meld her" : "Neste"}
            </Button>)
        }
    }

    next = () => {
        const { step } = this.props.message;
        if (step === 'address' && this.props.addressSpecified) {
            this.props.addressSpecified(this.state.address);
        }
        else if (step === 'category' && this.props.categorySpecified) {
            this.props.categorySpecified(this.state.category);
        }
        else if (step === 'pictures' && this.props.picturesSpecified) {
            this.props.picturesSpecified(this.state.pictures);
        }
        else if (step === 'description' && this.props.descriptionSpecified) {
            this.props.descriptionSpecified(this.state.description);
        }
    }

    render() {
        const { message } = this.props;
        const { step } = message;
        const { show } = this.state;

        const hideCollapse = !checkStep(step, 'welcome', 'address');
        const collapseIcon = show ? hideIcon : showIcon;

        const buttonClasses = classNames('message-collapse', { hidden: hideCollapse });

        return (
            <div>
                <div className="message-wizard">
                    <Collapse in={show}>
                        <div className="message-container">
                            <div className="message-content">
                                {this.renderWelcome(step)}
                                {this.renderSteps(step)}
                                {this.renderReceipt(step)}
                                {this.renderNextButton()}
                                {this.renderAbortButton()}
                            </div>
                        </div>
                    </Collapse>
                    <div style={{ textAlign: 'center' }}>
                        <Button className={buttonClasses} onClick={this.toggleCollapse}>
                            <Image src={collapseIcon} />
                        </Button>
                    </div>
                </div>
                {
                    checkStep(step, 'category', 'pictures', 'description', 'submit', 'receipt') &&
                    <div className="modal-backdrop fade in"></div>
                }
            </div>
        );
    }
}

export default MessageWizard;