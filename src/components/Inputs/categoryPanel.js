import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';


import Kategori from '../../components/kategori';

class CategoryPanel extends Component {
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
            <div id="fullskjermpanelcontainer">
                <Panel className="text-center" style={{ 'backgroundColor': 'white', 'margin': '0px', 'borderRadius': '0px' }}>
                    <Kategori geodata={this.props.geodata} onContinue={this.props.onContinue}/>
                </Panel>
            </div>

        );
    }
}


CategoryPanel.defaultProps = {
}


CategoryPanel.propTypes = {
    geodata: PropTypes.object.isRequired,
    onContinue: PropTypes.func.isRequired
};


export default CategoryPanel;