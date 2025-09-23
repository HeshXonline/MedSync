import React, { useState, useEffect } from 'react';

const SearchInterface = ({ searchQuery, setSearchQuery, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchSuggestions = [
    'How to book an appointment',
    'Reset password',
    'Update profile information',
    'Payment methods',
    'Cancel appointment',
    'Video call troubleshooting',
    'Insurance coverage',
    'Medical records access',
    'Prescription refills',
    'Contact support'
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    setShowSuggestions(false);
  };

  return (
    <div className="search-interface">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="search-input"
            onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <button type="submit" className="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="suggestion-icon">🔍</span>
                <span className="suggestion-text">
                  {suggestion.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) =>
                    part.toLowerCase() === searchQuery.toLowerCase() ? (
                      <mark key={i}>{part}</mark>
                    ) : (
                      part
                    )
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </form>
      
      {searchQuery && (
        <div className="search-filters">
          <span className="filter-label">Filter by:</span>
          <button className="filter-btn active">All</button>
          <button className="filter-btn">FAQ</button>
          <button className="filter-btn">Articles</button>
          <button className="filter-btn">Videos</button>
        </div>
      )}
    </div>
  );
};

export default SearchInterface;