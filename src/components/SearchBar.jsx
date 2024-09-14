// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);

  // Fetch country data
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryData = response.data.map(country => ({
          name: country.name.common,
          capital: country.capital ? country.capital[0] : 'No capital',
        }));
        setCountries(countryData);
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
      });
  }, []);

  // Handle search input changes
  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    if (query.length > 0) {
      const filteredSuggestions = countries.filter(country =>
        country.name.toLowerCase().includes(query) ||
        country.capital.toLowerCase().includes(query)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search by country or capital..."
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion.name} ({suggestion.capital})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
