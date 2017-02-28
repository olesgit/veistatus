import React from 'react';
import {shallow, mount} from 'enzyme';
import ButtonModal from './ButtonModal';
import {Modal, Button} from 'react-bootstrap';

function shallowSetup(props) {
    const wrapper = shallow(<ButtonModal {...props} />);

    return {
        props,
        wrapper
    };
}

function mountSetup(props) {
    const wrapper = mount(<ButtonModal {...props} />);

    return {
        props,
        wrapper
    };
}

describe('ButtonModal', () => {
    const noOp = () => {};
    let props = {
        onClose: noOp,
        buttonText: "",
        modalTitle: ""
    };

    it('should show Modal if button is clicked', () => {
        //arrange
        const {wrapper} = shallowSetup(props);

        //act
        wrapper.find(Button).first().simulate('click');

        //assert
        const modalWrapper = wrapper.find(Modal);
        expect(modalWrapper.props().show).toBeTruthy();
    });

    it('should render button text from props', () => {
        //arrange
        const buttonText = "Legg til bruker";
        props.buttonText = buttonText;
        const {wrapper} = mountSetup(props);

        //assert
        expect(wrapper.find(Button).first().text()).toEqual(buttonText);
    });

    it('should render button text from props', () => {
        //arrange
        const buttonText = "Legg til bruker";
        props.buttonText = buttonText;
        const {wrapper} = mountSetup(props);

        //assert
        expect(wrapper.find(Button).first().text()).toEqual(buttonText);
    });
});