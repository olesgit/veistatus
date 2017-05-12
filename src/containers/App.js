import React, { Component, PropTypes } from 'react';
<<<<<<< HEAD
// import HeaderContainer from './Layout/HeaderContainer';
// import PageHeader from '../components/Layout/PageHeader';
=======
import HeaderContainer from './Layout/HeaderContainer';
>>>>>>> 189fa3b46733ccc3bf9fe3b4318f0a45f9f55328
import FlashMessagesList from "../components/common/FlashMessagesList";

export default class App extends Component {

<<<<<<< HEAD
        this.setPageHeaderInfo = this.setPageHeaderInfo.bind(this);

        this.state = {
            pageTitle: "",
            subTitle: ""
        }
    }

    setPageHeaderInfo(location) {
        if (!location.pathname) return;
        const title = (location.state && location.state.pageTitle) ? location.state.pageTitle : "Vei Status";

        let pageTitleFromState = "";
        if (location.state && location.state.subTitle)
            pageTitleFromState = location.state.subTitle;

        this.setState({ pageTitle: title, subTitle: pageTitleFromState });
=======
    static propTypes = {
        children: PropTypes.node
>>>>>>> 189fa3b46733ccc3bf9fe3b4318f0a45f9f55328
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
<<<<<<< HEAD
                {/*<HeaderContainer />*/}
                {/*<PageHeader pageTitle={this.state.pageTitle} subTitle={this.state.subTitle} />*/}
=======
                <HeaderContainer ref={r => this.header = r} />
>>>>>>> 189fa3b46733ccc3bf9fe3b4318f0a45f9f55328
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