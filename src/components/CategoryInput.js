import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import Autosuggest from 'react-autosuggest'

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

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        })
    }

    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion.meldingstype.beskrivelse}
            </div>
        );
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

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            className: 'form-control',
            placeholder: 'Beskriv problemet (f.eks hull i veien)',
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                id="kategoriInput"
                className="form-group"
                suggestions={suggestions}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default CategoryInput;