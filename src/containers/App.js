import React, { Component, PropTypes } from 'react';
import HeaderContainer from './Layout/HeaderContainer';
import FlashMessagesList from "../components/common/FlashMessagesList";

export default class App extends Component {

    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.node)
    }

    render() {
        return (
            <div>
                <HeaderContainer />
                <FlashMessagesList />
                {this.props.children}
            </div>
        );
    }

}