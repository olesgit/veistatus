import _ from 'lodash'

export default function filterCategorties(categories, text) {
    const words = text.split(' ');
    const result = _.map(categories, category => appendTo(searchWords(namesOf(category), words), category));
    return cleanupResult(result);
}

export function namesOf(category) {
    return category.meldingskategorier.map(c => c.navn);
}

export function appendTo(result, category) {
    result.category = category;
    return result;
}

// foreach category
// count number of matches
// count number of partial matches

export function isMatch(name, text) {
    name = name.toLowerCase();
    text = text.toLowerCase();
    return name === text || _.startsWith(text, name);
}

export function isMatchingNames(names, text) {
    return _.some(names, name => isMatch(name, text));
}

export function isPartialMatch(name, text) {
    name = name.toLowerCase();
    text = text.toLowerCase();
    return _.includes(name, text);
}

export function isPartialMatchingNames(names, text) {
    return _.some(names, name => isPartialMatch(name, text));
}

export function searchWords(names, words) {
    const result = { match: 0, partial: 0 }
    _.forEach(words, word => {
        if (isMatchingNames(names, word)) {
            ++result.match;
        } else if (isPartialMatchingNames(names, word)) {
            ++result.partial;
        }
    });
    return result;
}

export function cleanupResult(searchResult) {
    // TODO include top - 1 also?
    const top = _.max(_.map(searchResult, r => r.match));
    searchResult = _.filter(searchResult, r => r.match === top);
    searchResult = _.orderBy(searchResult, r => r.partial, "desc");
    searchResult = _.map(searchResult, r => r.category);
    return searchResult;
}