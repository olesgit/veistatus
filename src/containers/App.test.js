import React from 'react';
import App from './App';
import {shallow} from "enzyme";
import * as routes from '../constants/clientRoutes';

describe('App', () => {
    it('should render without crashing', () => {
        shallow(<App />);
    });

    it('should update pageTitle to "Serviceavdelingen" when location pathname changes to /serviceavdelingen', () => {
        //arrange
        const wrapper = shallow(<App/>);

        //act
        wrapper.setProps({location: {pathname: routes.serviceAvdelingen}});

        //assert
        expect(wrapper.state().pageTitle).toEqual("Serviceavdelingen");
    });

    it('should update pageTitle to "Entreprenører" when location pathname changes to /entrepreneurs', () => {
        //arrange
        const wrapper = shallow(<App/>);

        //act
        wrapper.setProps({location: {pathname: routes.selskaper}});

        //assert
        expect(wrapper.state().pageTitle).toEqual("Entreprenører");
    });

    it('should update pageTitle to "Entreprenører" when location pathname has additional info after /', () => {
        //arrange
        const wrapper = shallow(<App/>);

        //act
        wrapper.setProps({location: {pathname: routes.selskaper + "/someId"}});

        //assert
        expect(wrapper.state().pageTitle).toEqual("Entreprenører");
    });

    it('should let pageTitle from state override pageTitle from location pathname', () => {
        //arrange
        const wrapper = shallow(<App/>);

        //act
        wrapper.setProps({location: {pathname: routes.serviceAvdelingen, state: {pageTitle: "Bymiljøetaten"}}});

        //assert
        expect(wrapper.state().pageTitle).toEqual("Bymiljøetaten");
    });

    it('should update subTitle to "Infratek" when location state has subTitle', () => {
        //arrange
        const wrapper = shallow(<App/>);

        //act
        const subTitle = "Infratek";
        wrapper.setProps({
            location: {
                state: {subTitle: subTitle},
                pathname: "Somepath"
            }
        });

        //assert
        expect(wrapper.state().subTitle).toEqual(subTitle);
    });
});

