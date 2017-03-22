import React, { PureComponent } from 'react'

import './Welcome.css'

class Welcome extends PureComponent {
    render() {
        return (
            <div className="welcome-content">
                <h1>Velkommen til Oslo kommunes Bymelding</h1>
                <p>Her kan du raskt og enkelt melde fra om feil og mangler til Bymiljøetaten i Oslo kommune.</p>
                <ul>
                    <li>Meld inn feil</li>
                    <li>Se status</li>
                    <li>Se andre saker</li>
                </ul>
            </div>
        );
    }
}

export default Welcome