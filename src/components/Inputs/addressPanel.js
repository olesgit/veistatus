import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';


import Adresse from '../../components/Adresse';

class AddressPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            valgtAdresse: "",
            toggleImg: "pil-opp.png"
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    SelectCoord(data) {
        this.setState({ valgtAdresse: data.display_name });
    }

    TogglePanel() {
        this.setState({ open: !this.state.open });
        this.setState({ toggleImg: this.state.toggleImg === "pil-ned.png" ? "pil-opp.png" : "pil-ned.png" });
    }

    nameIsValid() {
        return true;
    }

    render() {
        return (
            <div id="panelcontainer">
                <Panel className="text-center" collapsible expanded={this.state.open} style={{ 'backgroundColor': 'white', 'margin': '0px', 'borderRadius': '0px' }}>
                    <Adresse geodata={this.props.geodata}/>
                </Panel>
                <div className="text-center buttonoverlaycontainer" style={{ 'backgroundColor': 'red' }}>
                    <Button className="collapsible-button btn-lg" onClick={() => this.TogglePanel()} style={{ 'backgroundColor': 'white', 'border': 'none', 'borderRadius': '0px'  }}>
                        <img src={this.state.toggleImg} alt='pil opp' />
                    </Button>
                </div>
            </div>

        );
    }
}


AddressPanel.defaultProps = {
}


AddressPanel.propTypes = {
    geodata: PropTypes.object.isRequired
};


export default AddressPanel;