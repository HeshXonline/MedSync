import React from 'react';

const SearchBar = ({ value, onChange, onSearch, placeholder = 'Search' }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

