import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';

//import {SimpleExample} from '../../components/Meldinger/SimpleMapExample';
import {MapView} from '../../components/Meldinger/MapBoxSample';

class KombinertMeldingsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visningstype: ""
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
                <div id="container">

                    <Panel>
                        <MapView />
                    </Panel>
              
            </div>
        );
    }
}


KombinertMeldingsContainer.defaultProps = {
}


KombinertMeldingsContainer.propTypes = {
};


function mapStateToProps(state, ownProps) {
    return {
    };
}


const mapDispatchToProps = (dispatch) =>
{
    return bindActionCreators({ }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(KombinertMeldingsContainer);