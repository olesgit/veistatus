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

const initialState = {
    address: null,
    category: null,
    pictures: null,
    description: null
};

function checkStep(step, ...stepsToCheck) {
    return _.includes(stepsToCheck, step);
}

class MessageWizard extends Component {

    static propTypes = {
        step: PropTypes.string,
        geodata: PropTypes.object,
        changeStep: PropTypes.func,
        locationSeleted: PropTypes.func
    }

    static defaultProps = {
        step: 'welcome'
    }

    state = {
        open: true,
        ...initialState
    }

    componentWillReceiveProps(nextProps) {
        // What to do?
    }

    changeAddress = (address) => {
        this.setState({ address: address });
        this.props.changeStep('category');
    }

    changeCategory = (category) => {
        this.setState({ category: category });
        this.props.changeStep('pictures');
    }

    changePictures = (pictures) => {
        this.setState({ pictures: pictures });
        this.props.changeStep('description');
    }

    changeDescription = (description) => {
        this.setState({ description: description });
        this.props.changeStep('submit');
    }

    createMessage() {
        return {
            "innsenderNavn": null,
            "innsenderEpost": null,
            "meldingstypeId": this.state.category && this.state.category.meldingstype.meldingstypeId,
            "beskrivelse": this.state.description,
            "adresse": this.state.address && this.state.address.display_name,
            "latitude": this.state.address && this.state.address.lat,
            "longitude": this.state.address && this.state.address.lon,
            "bilder": this.state.pictures
        }
    }

    toggleCollapse = () => {
        this.setState({ open: !this.state.open });
    }

    renderWelcome(step) {
        if (checkStep(step, 'welcome')) {
            return <Welcome />
        }
    }

    abort = () => {
        this.setState({ ...initialState });
        this.props.locationSeleted(null);
        this.props.changeStep('address');
    }

    renderSteps(step) {
        if (checkStep(step, 'address', 'category', 'pictures', 'description', 'submit')) {
            return ([
                <AddressContainer key="address-step" address={this.state.address} addressSpecified={this.changeAddress} editing={step === 'address'} geodata={this.props.geodata} locationSeleted={this.props.locationSeleted} />,
                <CategoryContainer key="category-step" category={this.state.category} categorySpecified={this.changeCategory} editing={step === 'category'} abort={this.abort} />,
                <PictureContainer key="pictures-step" pictures={this.state.pictures} picturesSpecified={this.changePictures} editing={step === 'pictures'} abort={this.abort} />,
                <DescriptionContainer key="description-step" description={this.state.description} descriptionSpecified={this.changeDescription} editing={step === 'description'} abort={this.abort} />,
                <SubmitContainer key="submit-step" submitMessage={this.submitMessage} editing={step === 'submit'} message={this.createMessage()} abort={this.abort} />
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