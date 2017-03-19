import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import GeoAutoComplete from './geoAutoComplete';
import Velkommen from '../../components/Velkommen';
import '../../css/Panels/Panel.css';
import '../../css/Sider/Velkommen.css';

class WelcomePanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            toggleImg: "pil-opp.png",
        };
    }

    TogglePanel() {
        this.setState({ open: !this.state.open });
        this.setState({ toggleImg: this.state.toggleImg === "pil-ned.png" ? "pil-opp.png" : "pil-ned.png" });
    }

    render() {
        return (
            <div id="panelcontainer">
                <Panel className="text-center" collapsible expanded={this.state.open} style={{ 'backgroundColor': 'white', 'margin': '0px', 'border': 'none', 'borderRadius': '0px' }}>
                    <Velkommen />
                </Panel>
                <div className="text-center buttonoverlaycontainer" style={{ 'backgroundColor': 'red' }}>
                    <Button className="collapsible-button btn-lg" onClick={() => this.TogglePanel()} style={{ 'backgroundColor': 'white', 'border': 'none', 'borderRadius': '0px'  }}>
                        <img src={this.state.toggleImg} alt='pil opp' />
                    </Button>
                </div>
                <GeoAutoComplete marginTop={{'marginTop': '100px'}} geodata={this.props.geodata} onSelectAddress={this.props.onSelectAddress} selectSuggestion={this.props.selectSuggestion} Height={{'height': '60px'}}/>  
            </div>
        );
    }
}

WelcomePanel.defaultProps = {
}

WelcomePanel.propTypes = {
    geodata: PropTypes.object.isRequired,
    onSelectAddress: PropTypes.func.isRequired,
    selectSuggestion: PropTypes.func.isRequired
};

export default WelcomePanel;