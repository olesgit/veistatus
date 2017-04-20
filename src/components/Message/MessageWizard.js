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
import WelcomeContainer from '../../containers/Message/WelcomeContainer'

import './MessageWizard.css'
import showIcon from '../../images/collapse-show.svg'
import hideIcon from '../../images/collapse-hide.svg'

function checkStep(step, ...stepsToCheck) {
    return _.includes(stepsToCheck, step);
}

function isWizardSteps(step) {
    return checkStep(step, 'address', 'category', 'pictures', 'description', 'submit');
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
        descriptionSpecified: PropTypes.func.isRequired,
        abort: PropTypes.func.isRequired,
        goto: PropTypes.func.isRequired
    }

    state = {
        show: true,
        address: this.props.message.address || null,
        category: this.props.message.category || null,
        pictures: this.props.message.pictures || [],
        description: this.props.message.description || ''
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.geodata && this.props.geodata !== nextProps.geodata) {
            this.setState({ show: true });
        }

        if (nextProps.hideWelcome !== this.props.hideWelcome) {
            this.setState({ show: false });
        }

        // Address may also be changed in MapView or MapSearch
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
        const { step } = this.props.message;
        return ((step === 'address' || step === 'address-map') && this.state.address == null) ||
            (step === 'category' && this.state.category == null)
    }

    renderWelcome(step) {
        if (checkStep(step, 'welcome')) {
            return <WelcomeContainer />
        }
    }

    renderSteps(step) {
        if (checkStep(step, 'address', 'address-map', 'category', 'pictures', 'description', 'submit')) {
            return ([
                <AddressContainer key="address-step" value={this.state.address} onChange={this.addressChanged} />,
                <CategoryContainer key="category-step" value={this.state.category} onChange={this.categoryChanged} />,
                <PicturesContainer key="pictures-step" value={this.state.pictures} onChange={this.picturesChanged} />,
                <DescriptionContainer key="description-step" value={this.state.description} onChange={this.descriptionChanged} />,
                <SubmitContainer key="submit-step" submitted={this.submitted} />
            ]);
        }
    }

    renderReceipt(step) {
        if (checkStep(step, 'receipt')) {
            return <ReceiptContainer />;
        }
    }

    renderAbortButton(id) {
        if (checkStep(this.props.message.step, 'address', 'address-map', 'category', 'pictures', 'description', 'submit')) {
            return (<Button id={id} className="wizard-abort" bsStyle="link" block onClick={this.abort}>Avbryt</Button>)
        }
    }

    renderNextButton() {
        var { step } = this.props.message
        if (checkStep(step, 'address', 'address-map', 'category', 'pictures', 'description')) {
            return (<Button id="next" className="wizard-next" bsStyle="success" block onClick={this.next} disabled={this.nextDisabled()}>
                {step === 'address-map' ? "Meld her" : "Neste"}
            </Button>)
        }
    }

    renderMobileButtons(step) {
        if (checkStep(step, 'category', 'pictures', 'description')) {
            return [
                <Button id="previous-mobile" key="previous" className="wizard-previous-mobile" bsStyle="link" onClick={this.previous}>
                    Tilbake
                </Button>,
                <Button id="next-mobile" key="next" className="wizard-next-mobile" bsStyle="success" onClick={this.next} disabled={this.nextDisabled()}>
                    Neste
                </Button>
            ]
        }
    }

    previous = () => {
        const { step } = this.props.message;
        if (step === 'category') {
            this.props.goto('address');
        }
        else if (step === 'pictures') {
            this.props.goto('category');
        }
        else if (step === 'description') {
            this.props.goto('pictures');
        }
    }

    next = () => {
        const { step } = this.props.message;
        if ((step === 'address' || step === 'address-map') && this.props.addressSpecified) {
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

    abort = () => {
        this.clearState();
        this.props.abort();
    }

    submitted = () => {
        this.clearState();
    }

    clearState() {
        this.setState({
            ...this.state,
            address: null,
            category: null,
            pictures: [],
            description: ''
        });
    }

    render() {
        const { message } = this.props;
        const { step } = message;
        const { show } = this.state;

        const hideCollapse = !checkStep(step, 'welcome');
        const collapseIcon = show ? hideIcon : showIcon;

        const wizardClasses = classNames('message-wizard-container', `wizard-step-${step}`)
        const buttonClasses = classNames('message-collapse', { hidden: hideCollapse });
        const contentClasses = classNames('message-content', { 'message-steps': isWizardSteps(step) });

        return (
            <div className={wizardClasses}>
                <div className="message-wizard">
                    <Collapse in={show}>
                        <div className="message-container">
                            <div className={contentClasses}>
                                {this.renderWelcome(step)}
                                {this.renderSteps(step)}
                                {this.renderReceipt(step)}
                                <div className="message-footer clearfix">
                                    {this.renderNextButton()}
                                    {this.renderAbortButton("abort")}
                                    {this.renderMobileButtons(step)}
                                </div>
                                {this.renderAbortButton("abort-mobile")}
                            </div>
                        </div>
                    </Collapse>
                    <div className="message-collapse-container">
                        <Button className={buttonClasses} onClick={this.toggleCollapse}>
                            <Image src={collapseIcon} />
                        </Button>
                    </div>
                </div>
                {
                    checkStep(step, 'address', 'category', 'pictures', 'description', 'submit', 'receipt') &&
                    <div className="modal-backdrop wizard-backdrop fade in"></div>
                }
            </div>
        );
    }
}

export default MessageWizard;