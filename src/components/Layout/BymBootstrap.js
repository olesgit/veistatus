import React from 'react';
import {Button, Table, Jumbotron} from 'react-bootstrap';

import './BymBootstrap.css';

const BymBootstrap = () => {
    return (
        <div className="bymBootstrap">
            <Jumbotron><h1>BYMelding Bootstrap</h1><p>BYMelding har eget bootstrap theme. Under er en oppdatert oversikt over Bootstrap komponenter som er overrides av vår stil</p></Jumbotron>
            <h2>Knapper</h2>
            <p>Standard knapp brukes i de fleste tilfeller. Call-to-action brukes der det er meningen til å hjelpe /
                guide brukeren videre og det må derfor ikke forekomme flere knapper i denne fargen i nærheten av denne
                knappen. Den positive knappen brukes i sammenhenger hvor brukeren vil gi positivt input som Ok, Fortsett
                eller “Riktig svar”, i motsetning til den negative knappen som brukes som Avbryt, Stop eller Feil
                svar.</p>
            <h2>Knappetilstander</h2>
            <Table>
                <tr>
                    <td><Button>Standard</Button></td>
                    <td><code>bsStyle=""</code></td>
                </tr>
                <tr>
                    <td><Button bsStyle="primary">Call-to-action</Button></td>
                    <td><code>bsStyle="primary"</code></td>
                </tr>
                <tr>
                    <td><Button bsStyle="success">Positive</Button></td>
                    <td><code>bsStyle="success"</code></td>
                </tr>
                <tr>
                    <td><Button bsStyle="danger">Negative</Button></td>
                    <td><code>bsStyle="danger"</code></td>
                </tr>
                <tr>
                    <td><Button bsStyle="link">Link</Button></td>
                    <td><code>bsStyle="link"</code></td>
                </tr>
                <tr>
                    <td><Button bsStyle="link" className="danger">Link Danger</Button></td>
                    <td><code>bsStyle="link" className"danger"</code></td>
                </tr>

            </Table>

            <h2>Knappestørrelser</h2>
            <Table>
                <tr>
                    <td><Button bsSize="large">Lang</Button></td>
                    <td><code>bsSize="large"</code></td>
                </tr>
                <tr>
                    <td><Button>Standard</Button></td>
                    <td><code>bsSize=""</code></td>
                </tr>
                <tr>
                    <td><Button bsSize="small">Kort</Button></td>
                    <td><code>bsSize="small"</code></td>
                </tr>
            </Table>

            <h2>Bootstrap knapper som ikke brukes</h2>
            <Table>
                <tr>
                    <td><Button bsStyle="info">Info</Button></td>
                    <td><code>bsStyle="info"</code></td>
                </tr>
                <tr>
                    <td><Button bsStyle="warning">Warning</Button></td>
                    <td><code>bsStyle="warning"</code></td>
                </tr>
            </Table>

            <h2>Bootstrap Table</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Navn</th>
                        <th>Rolle</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Anne Kari Mikkelsen</td>
                    <td>Saksbehandler</td>
                    <td>anne@kari.no</td>
                </tr>
                <tr>
                    <td>Beate Volden</td>
                    <td>Saksbehandler</td>
                    <td>beate@volden.no</td></tr>
                <tr>
                    <td>Erik Karlsen</td>
                    <td>Administrator</td>
                    <td>admin@bymelding.no</td></tr>
                <tr>
                    <td>Diako Kezri</td>
                    <td>BymeldingAdmin</td>
                    <td>diako@kezri.no</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default BymBootstrap;