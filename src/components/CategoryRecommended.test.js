import React from 'react';
import CategoryRecommended from './CategoryRecommended';
import { shallow } from 'enzyme';

it('should render without crashing', () => {
    shallow(<CategoryRecommended categories={categories} onCategorySelected={null} />);
});

it('should render each recommended category', () => {
    var target = shallow(<CategoryRecommended categories={categories} onCategorySelected={null} />);
    expect(target.find('button').length).toEqual(1);
});

const categories = [
    {
        // Recommended category
        "meldingstype": {
            "meldingstypeId": "e414f798-454f-495c-ba61-ccbdd5a89296",
            "beskrivelse": "Søppel - Annen forsøpling",
        }
    },
    {
        // Not recommended category
        "meldingstype": {
            "meldingstypeId": "e081d98a-6328-484d-809e-6e055753143cwe",
            "beskrivelse": "Skittent fortau",
        },
    }
];