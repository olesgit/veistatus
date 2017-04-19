import React, { PropTypes, PureComponent } from 'react'
import { Button, Image } from 'react-bootstrap'

import './Welcome.css'

import logo from '../../images/byvaapen.png'

class Welcome extends PureComponent {

    static propTypes = {
        goto: PropTypes.func.isRequired
    }

    click = () => {
        this.props.goto();
    }

    render() {
        return (
            <div className="welcome-content">
                <div className="welcome-header">
                    <Image src={logo} />
                    <div className="welcome-header-text">
                        Oslo kommune
                        <br />
                        <strong>Bymiljøetaten</strong>
                    </div>
                </div>
                <h1>Velkommen til Oslo kommunes Bymelding</h1>
                <p>Her kan du raskt og enkelt melde fra om feil og mangler til Bymiljøetaten i Oslo kommune.</p>
                <ul>
                    <li>Meld inn feil</li>
                    <li>Se status</li>
                    <li>Se andre saker</li>
                </ul>
                <Button id="meld-sak" block bsStyle="primary" onClick={this.click}>Meld sak</Button>
            </div>
        );
    }
}

export default Welcome