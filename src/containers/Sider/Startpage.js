import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStreets, putStreet, postStreet, deleteStreet } from '../../actions/veistatusActions';
import VeiStatusForm from '../../components/veistatus';
import { addFlashMessage } from "../../actions/FlashMessagesAction";

import './Startpage.css';


class Startpage extends Component {

    static propTypes = {
        getStreets: PropTypes.func.isRequired,
        putStreet: PropTypes.func.isRequired,
        postStreet: PropTypes.func.isRequired,
        deleteStreet: PropTypes.func.isRequired
    }

    getStreets() {
        this.props.getStreets();
    }

    update(street) {
        if(street.Gatenavn === '') {
            this.props.addFlashMessage({ type: 'error', text: "Gatenavn kan ikke være tom" });
            return;
        }
        
        if(street.ID === undefined) {
            this.props.postStreet(street);
            return;
        }

        this.props.putStreet(street);
    }

    delete(street) {
        if (street.Gatenavn === '') {
            this.props.addFlashMessage({ type: 'error', text: "Gatenavn kan ikke være tom" });
            return;
        }

        if (street.ID === undefined || street.ID === 2901) { //2901 - blank record
            this.props.addFlashMessage({ type: 'error', text: "Tom post kan ikke slettes" });
            return;
        }

        //console.log(street);
        this.props.deleteStreet(street)
            .then(res => {
                this.props.addFlashMessage({ type: 'success', text: "Gate er slettet" })
            })
            .catch(err => {
                this.props.addFlashMessage({ type: 'error', text: err })
            })

    }

    componentDidMount() {
        this.props.getStreets();
        //this.props.addFlashMessage({ type: 'error', text: "Test" });  //type by bootstrap classnames, eg alert-success
        //this.props.addFlashMessage({ type: 'success', text: "Test" });
    }

    render() {
        const streets = this.props.streets != null ? this.props.streets : [];
        return (
            <div>
                <VeiStatusForm streets={streets} update={ street => this.update(street)} delete={ street => this.delete(street)} getStreets={ () => this.getStreets()}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streets: state.veiStatus.streets
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addFlashMessage: bindActionCreators(addFlashMessage, dispatch),
        getStreets: bindActionCreators(getStreets, dispatch),
        putStreet: bindActionCreators(putStreet, dispatch),
        postStreet: bindActionCreators(postStreet, dispatch),
        deleteStreet: bindActionCreators(deleteStreet, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Startpage);