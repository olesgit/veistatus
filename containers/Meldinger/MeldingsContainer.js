//import {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadMessages} from '../../actions/messageActions';

import MeldingList from '../../components/Meldinger/MeldingList';

const MapStateToProps = (state) => {
  return {
      messages: (state.messages != null) ? state.messages.messages : [],
      loading: state.messages == null
  }
};

function MapDispatchToProps(dispatch, ownProps) {
    return {
        loadMessages: () => {dispatch(loadMessages())}
    };
}

const MeldingsContainer = connect(MapStateToProps, MapDispatchToProps)(MeldingList);

MeldingsContainer.DefaultProps = {
};
// MeldingsContainer.propTypes = {
// };

export default MeldingsContainer;