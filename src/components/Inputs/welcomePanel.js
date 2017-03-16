import React, { Component, PropTypes } from 'react';
import { Panel, Button, FormGroup } from 'react-bootstrap';


import { GeoExample } from '../../components/Meldinger/GeoExample';
import Velkommen from '../../components/Velkommen';


class WelcomePanel extends Component {
    constructor(props) {
        super(props);

        this.handleClickSuggestion = this.handleClickSuggestion.bind(this);

        this.state = {
            open: true,
            valgtAdresse: "",
            toggleImg: "pil-opp.png",
            // streetlist: [{ id: 1, adresse: 'Mingate 1', place_id: 'xyz'}, { id: 2, adresse: 'Mingate 2', place_id: 'u,v,w' }, { id: 3, adresse: 'Mingate 3', place_id: 'rst' }] //Viser formatet
            streetlist: []
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

    onSuggestInputChange() {
        //console.log("onSuggestInputChange");
        this.setState({ streetlist: [] });
    }

    Suggest(data) {
        //console.log(data);
        if(this.state.streetlist.find(street => street.id === data.id)) return;
        let s = { id: data.id, adresse: data.description, place_id: data.place_id };
        this.setState({ streetlist: this.state.streetlist.concat(s) });
    }

    TogglePanel() {
        this.setState({ open: !this.state.open });
        this.setState({ toggleImg: this.state.toggleImg === "pil-ned.png" ? "pil-opp.png" : "pil-ned.png" });
    }

    nameIsValid() {
        return true;
    }

    handleClickSuggestion(e,street) {
        this.props.selectSuggestion(street);
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
                            <GeoExample onSelectAddress={this.props.onSelectAddress} onSuggest={(data) => this.Suggest(data)} onChange={() => this.onSuggestInputChange()}/>
                            <span className="input-group-addon" id="sizing-addon1" style={{ 'height': '60px', 'maxHeight': '60px', 'borderRadius': '0px'}}>@</span>
                        </div>


                        {this.state.streetlist.length > 0 &&
                            <div className="dropdown" style={{
                                'backgroundColor': 'white', 'textAlign': 'left', 'maxWidth': '740px', 'minWidth': '260px', 'marginLeft': 'auto', 'marginRight': 'auto',
                                'border': '1px solid grey', 'borderRadius': '0px', 'color': 'black'
                            }}>

                                <ul style={{
                                    'margin': '0', 'padding': '0', 'textAlign': 'left', 'lineHeight': '1.8', 'color': '#4a4a4a', 'fontSize': '24px', 'backgroundColor': 'white',
                                    'maxWidth': '740px', 'minWidth': '260px', 'marginLeft': 'auto', 'marginRight': 'auto', 'borderRadius': '0px',
                                    'listStyleType': 'none', 'listStylePosition': 'outside', 'listStyleImage': 'url(marker-white.png)', 'paddingLeft': '20px', 'paddingtop': '5px'
                                }}>
                                    {this.state.streetlist.map(street => {
                                        return <li onClick={(e) => this.handleClickSuggestion(e, street)} key={street.id}><span>{street.adresse}</span></li>;
                                    })
                                    }
                                </ul>
                            </div>
                        }

                    </FormGroup>
                </div>

            </div>

        );
    }
}


WelcomePanel.defaultProps = {
}


WelcomePanel.propTypes = {
    onSelectAddress: PropTypes.func.isRequired,
    selectSuggestion: PropTypes.func.isRequired
};


export default WelcomePanel;