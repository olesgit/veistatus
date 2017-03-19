import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import '../css/Sider/Velkommen.css';

class Velkommen extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = this.initialState();
    }

    initialState() {
        return {
            Notused: "",
            NotusedTouched: false
        };
    }

    render() {
        return (
            <div className="velkommen">
                <Row>
                    <Col md={4}>
                    </Col>
                    <Col md={4}>
                        <p className="text-30px velkommen-shape1"><strong>Velkommen til Oslo kommunes Bymelding</strong></p>
                        <p className="text-21px velkommen-shape2">Her kan du raskt og enkelt melde fra om feil og mangler til Bymiljøetaten i Oslo kommune.</p>
                        <ul className="text-20px velkommen-shape3 list-no-padding">
                            <li>Meld inn feil</li>
                            <li>Se status</li>
                            <li>Se andre saker</li>
                        </ul>

                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>
            </div>
        );
    }
}

Velkommen.propTypes = {
};

export default Velkommen;