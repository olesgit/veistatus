import React, {Component, PropTypes} from 'react';
import {Grid} from 'react-bootstrap';
import HeaderContainer from './Layout/HeaderContainer';
import PageHeader from '../components/Layout/PageHeader';
import Footer from '../components/Layout/Footer';
import FlashMessagesList from "../components/common/FlashMessagesList";
import {getDisplayName} from '../constants/clientRoutes';

export default class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.setPageHeaderInfo = this.setPageHeaderInfo.bind(this);

        this.state = {
            pageTitle: "",
            subTitle: ""
        }
    }

    setPageHeaderInfo(location) {
        if (!location.pathname) return;
        const title = (location.state && location.state.pageTitle) ? location.state.pageTitle : getDisplayName(location.pathname);

        let pageTitleFromState = "";
        if (location.state && location.state.subTitle)
            pageTitleFromState = location.state.subTitle;

        this.setState({pageTitle: title, subTitle: pageTitleFromState});
    }

    componentWillMount() {
        if (this.props.location)
            this.setPageHeaderInfo(this.props.location);
    }

    componentWillReceiveProps(nextProps) {
        //get properties from route location object and set state for PageHeader
        if (nextProps.location && nextProps.location !== this.props.location) {
            this.setPageHeaderInfo(nextProps.location);
        }
    }

    render() {
        return (
            <div>
                <HeaderContainer />
                <PageHeader pageTitle={this.state.pageTitle} subTitle={this.state.subTitle}/>
                <FlashMessagesList />
                <Grid>
                    {this.props.children}
                </Grid>
                <Footer />
            </div>
        );
    }
}

App.proptypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    location: PropTypes.object
};