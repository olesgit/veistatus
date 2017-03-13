import React, { Component, PropTypes } from 'react';
import { Panel, Button, FormGroup } from 'react-bootstrap';


import { GeoExample } from '../../components/Meldinger/GeoExample';
import Velkommen from '../../components/Velkommen';


class WelcomePanel extends Component {
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
        // console.log("welcomePanel componentDidMount props:");
        // console.log(this.props);
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
                    <Velkommen />
                </Panel>
                <div className="text-center buttonoverlaycontainer" style={{ 'backgroundColor': 'red' }}>
                    <Button className="collapsible-button btn-lg" onClick={() => this.TogglePanel()} style={{ 'backgroundColor': 'white', 'border': 'none', 'borderRadius': '0px'  }}>
                        <img src={this.state.toggleImg} alt='pil opp' />
                    </Button>
                </div>

                {/*<div className="text-center" style={{ 'backgroundColor': 'red', 'margin' : '100px', 'width' : '740px', 'height' : '60px', 'align' : 'center' }}>*/}
                <div className="text-center formgroupoverlaycontainer" style={{ 'marginTop': '100px', 'backgroundColor': 'red', 'textAlign': 'center' }}>
                    <FormGroup controlId="formControlsName" className="formgroupoverlaycontainer" style={{ 'backgroundColor': 'green' }}>

                        {/*The following is an example how to style an input and a list. This is a test of the styling and display of these parts. The input and the list will be replaced
                            by a single <GeoExample /> component. This component have an embedded input and list of suggestions. The same styling should apply as
                            far as possible to the embedded input and list in the GeoExample container.
                        <div className="input-group input-group-lg" style={{ 'textAlign': 'center', 'maxWidth': '740px', 'minWidth': '260px', 'backgroundColor': 'transparent', 
                                                                                'marginLeft': 'auto', 'marginRight': 'auto' }}>
                            <input type="text" className="form-control InputRectangle" placeholder="Søk etter adresse eller klikk i kart" aria-describedby="sizing-addon1"
                                style={{ 'position': 'relative', 'display': 'block', 'margin': '0 auto' }}>
                            </input>
                            <span className="input-group-addon" id="sizing-addon1">@</span>
                        </div>

                        <div className="dropdown" style={{ 'backgroundColor': 'white', 'textAlign': 'left', 'maxWidth': '740px', 'minWidth': '260px','marginLeft': 'auto', 'marginRight': 'auto',
                                                            'border': '1px solid grey', 'borderRadius': '2px' }}>
                            <ul className="text-24px searchlist-shape list-no-padding"  style={{ 'listStyleType': 'none', 'listStyleImage': 'url(marker-white.png)', 'marginLeft': '20px'}}>
                                <li><span>Mingate 1</span></li>
                                <li><span>Mingate 2</span></li>
                                <li><span>Mingate 3</span></li>
                            </ul>
                        </div>*/}

                        <div className="input-group input-group-lg" style={{
                            'textAlign': 'center', 'width': '100%', 'maxWidth': '740px', 'minWidth': '260px', 'backgroundColor': 'transparent',
                            'marginLeft': 'auto', 'marginRight': 'auto'
                        }}>
                            <GeoExample onSelectAddress={this.props.onSelectAddress}/>
                            {/*<span className="input-group-addon" id="sizing-addon1" style={{ 'height': '60px', 'maxHeight': '60px'}}>@</span>*/}
                        </div>

                    </FormGroup>
                </div>

            </div>

        );
    }
}


WelcomePanel.defaultProps = {
}


WelcomePanel.propTypes = {
    onSelectAddress: PropTypes.func.isRequired
};


export default WelcomePanel;