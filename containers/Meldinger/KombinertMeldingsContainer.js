import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { Panel, Grid } from 'react-bootstrap';

//import {SimpleExample} from '../../components/Meldinger/SimpleMapExample';
import {MapBoxSample} from '../../components/Meldinger/MapBoxSample';
import {KartInput} from '../../components/Meldinger/KartInput';

class KombinertMeldingsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valgtAdresse: ""
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    SelectCoord(data) {
        //console.log('in the container with data');
        console.log(data);
        this.setState({valgtAdresse: data.display_name});
    }

    render() {
        return (
                <div id="container">

                <div className="container-fluid">
                    <h1>Hello World!</h1>
                    
                    <div className="row">
                        <div className="col-sm-3 col-md-6 col-lg-4" style={{'backgroundColor': 'yellow'}}>
                            <p>Lorem ipsum...</p>
                            <KartInput selectedAdress={this.state.valgtAdresse}/>
                        </div>
                        <div className="col-sm-9 col-md-6 col-lg-8" style={{'backgroundColor': 'pink'}}>
                            <p>and many other things...</p>
                            <MapBoxSample onSelectCoord={(data) => this.SelectCoord(data)}/>
                        </div>
                    </div>

                </div>


              
            </div>
        );
    }
}


KombinertMeldingsContainer.defaultProps = {
}


// KombinertMeldingsContainer.propTypes = {
// };


function mapStateToProps(state, ownProps) {
    return {
    };
}


const mapDispatchToProps = (dispatch) =>
{
    return bindActionCreators({ }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(KombinertMeldingsContainer);