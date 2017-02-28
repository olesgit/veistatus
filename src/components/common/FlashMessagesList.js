
import { connect } from "react-redux";
import React, {Component, PropTypes} from 'react';
import FlashMessage from "../../containers/common/FlashMessage";
import {deleteFlashMessage} from '../../actions/FlashMessagesAction';

class FlashMessagesList extends Component {
    render () {
        const message= this.props.messages.map(message => 
            <FlashMessage key={message} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />
        );
        return (
            <div>
                {message}
            </div>
        )
    }
}

FlashMessagesList.propTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
}

function MapStateToProps(state){
    return {
        messages: state.flashMessages
    }
}

export default connect(MapStateToProps, {deleteFlashMessage}) (FlashMessagesList);