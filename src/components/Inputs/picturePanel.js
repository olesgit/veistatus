import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import Bilder from '../../components/Bilder';

class PicturePanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            valgtAdresse: "",
            toggleImg: "pil-opp.png"
        };
    }

    SelectCoord(data) {
        this.setState({ valgtAdresse: data.display_name });
    }

    TogglePanel() {
        this.setState({ open: !this.state.open });
        this.setState({ toggleImg: this.state.toggleImg === "pil-ned.png" ? "pil-opp.png" : "pil-ned.png" });
    }

    render() {
        return (
            <div id="fullskjermpanelcontainer">
                <Panel className="text-center" style={{ 'backgroundColor': 'white', 'margin': '0px', 'border': 'none', 'borderRadius': '0px' }}>
                    <Bilder geodata={this.props.geodata} onContinue={this.props.onContinue}/>
                </Panel>
            </div>

        );
    }
}

PicturePanel.defaultProps = {
}

PicturePanel.propTypes = {
    geodata: PropTypes.object.isRequired,
    onContinue: PropTypes.func.isRequired
};

export default PicturePanel;