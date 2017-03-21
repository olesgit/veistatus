import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import Autosuggest from 'react-autosuggest'

import './CategoryInput.css'

import clearIcon from '../images/clear.svg'

function getSuggestionValue(suggestion) {
    return suggestion != null ? suggestion.meldingstype.beskrivelse : '';
}

class CategoryInput extends Component {

    static propTypes = {
        category: PropTypes.object,
        categories: PropTypes.array.isRequired,
        onCategorySelected: PropTypes.func
    }

    static defaultProps = {
        category: null,
        categories: [],
        onCategorySelected: null
    }

    state = {
        value: getSuggestionValue(this.props.category),
        suggestions: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: getSuggestionValue(nextProps.category),
            suggestions: []
        })
    }

    onClick = (event) => {
        event.target.blur();
        this.setState({
            value: ''
        })
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        })
    }

    renderSuggestion(suggestion) {
        return (suggestion.meldingstype.beskrivelse);
    }

    getSuggestions = value => {
        return this.props.categories.filter(category => category.meldingskategorier.some(c => _.includes(c.navn.toLowerCase(), value.toLowerCase())));
    }

    onSuggestionsSelected = (event, { suggestion }) => {
        if (this.props.onCategorySelected) {
            this.props.onCategorySelected(suggestion);
        }
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    renderInputComponent = inputProps => {
        return (
            <div className="input-group category-input-group">
                <input {...inputProps} />
                <span className="input-group-btn">
                    <button className="btn category-input-clear" type="button" onClick={this.onClick}>
                        <img src={clearIcon} alt="clear-text" />
                    </button>
                </span>
            </div>
        );
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Beskriv problemet (f.eks hull i veien)',
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                id="kategori"
                className="form-group"
                suggestions={suggestions}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                renderInputComponent={this.renderInputComponent}
                theme={{
                    container: 'category-input-container',
                    input: 'form-control category-input',
                    suggestionsContainer: 'category-input-suggestions-container',
                    suggestionsList: 'category-input-suggestions-list',
                    suggestion: 'category-input-suggestion',
                    suggestionHighlighted: 'category-input-suggestion--highlighted'
                }}
            />
        );
    }
}

export default CategoryInput;