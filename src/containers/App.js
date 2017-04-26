import React, { Component, PropTypes } from 'react';
import HeaderContainer from './Layout/HeaderContainer';
import FlashMessagesList from "../components/common/FlashMessagesList";

export default class App extends Component {

    static propTypes = {
        children: PropTypes.node
    }

    showLoginDialog = () => {
        this.header.getWrappedInstance().showLogin();
    }

    showRegisterUser = () => {
        this.header.getWrappedInstance().showRegisterUser();
    }

    render() {
        return (
            <div>
                <HeaderContainer ref={r => this.header = r} />
                <FlashMessagesList />
                {React.cloneElement({ ...this.props }.children,
                    {
                        showLoginDialog: this.showLoginDialog,
                        showRegisterUser: this.showRegisterUser
                    })}
            </div>
        );
    }

}