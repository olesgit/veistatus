import React, {PropTypes} from 'react';
import Spinner from 'react-spinkit';
import {Table} from 'react-bootstrap';


class MeldingsList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    componentWillMount() {
        this.props.loadMessages();
    }

    render() {
        const {messages, loading} = this.props;
        if (loading) return (<div>
            <h1>Laster meldinger...</h1>
            <Spinner spinnerName="three-bounce"/>
        </div>);
        if (messages.length === 0) return (<div><h1>Ingen meldinger</h1></div>)
        return (
            <div className="meldingList">
                <Table>
                    <thead>
                    <tr>
                        <th>Type</th>
                        <th>Adresse</th>
                        <th>Innmeldt</th>
                        <th>Status</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                        {messages.map(message => {
                            return(
                            <tr key={message.id}>
                                <td>{message.type}</td>
                                <td>{message.adresse}</td>
                                <td>{message.innmeldt}</td>
                                <td>{message.status}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

MeldingsList.DefaultProps = {
};

MeldingsList.propTypes = {
    loadMessages: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default MeldingsList;