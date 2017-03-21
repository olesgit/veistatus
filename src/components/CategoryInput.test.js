import React from 'react';
import CategoryInput from './CategoryInput';
import { shallow } from 'enzyme';
import Autosuggest from 'react-autosuggest';

it('should render without crashing', () => {
    shallow(<CategoryInput categories={categories} />);
});

it('should have no suggestions initially', () => {
    var target = shallow(<CategoryInput categories={categories} />);
    expect(target.find(Autosuggest).prop('suggestions').length).toEqual(0);
});

it('should filter suggestions for input onChange', () => {
    // How to test?
});

const categories = [
    {
        "meldingstype": {
            "meldingstypeId": "e414f798-454f-495c-ba61-ccbdd5a89296",
            "navn": "Annen forsøpling",
            "beskrivelse": "Søppel - Annen forsøpling",
            "kartlagKobling": "Soppel"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7661763e-bffc-48be-aa09-530116a64e27",
                "navn": "Søppel"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "e081d98a-6328-484d-809e-6e055753143c",
            "navn": "Veibane",
            "beskrivelse": "Hull i veien - Veibane",
            "kartlagKobling": "Vei"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "2781201e-6a7c-4121-bcfa-6e4cd5c2afb6",
                "navn": "Hull i vei"
            },
            {
                "meldingskategoriId": "a8b85b11-af32-4e47-93a1-2d12cd991e2e",
                "navn": "Vei"
            }
        ]
    }
];