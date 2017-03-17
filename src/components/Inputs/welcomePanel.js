import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';


import { geoAutoComplete } from './geoAutoComplete';
import Velkommen from '../../components/Velkommen';


class WelcomePanel extends Component {
    constructor(props) {
        super(props);

        this.handleClickSuggestion = this.handleClickSuggestion.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onDeleteAdress = this.onDeleteAdress.bind(this);

        this.state = {
            open: false,
            valgtAdresse: "",
            toggleImg: "pil-opp.png",
            // streetlist: [{ id: 1, adresse: 'Mingate 1', place_id: 'xyz'}, { id: 2, adresse: 'Mingate 2', place_id: 'u,v,w' }, { id: 3, adresse: 'Mingate 3', place_id: 'rst' }] //Viser formatet
            streetlist: [],
            clear: false
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

    onSearch() {
        if(this.state.streetlist.length > 0)
            this.props.selectSuggestion(this.state.streetlist[0]);
    }

    onDeleteAdress() {
        this.setState( { clear: true } );
        setTimeout(() => { this.setState({ clear: false }) }, 200);
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
                {<geoAutoComplete/>}

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