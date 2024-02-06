// frontend/src/SearchBar.js
import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

const Searchbar = ( ) => {
  const [symbol, setSymbolTerm] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setSymbolTerm(e.target.value);
  };

  const params = {timeframe : '1y',};

  const handleSearch = () => { 
    navigate({
      pathname:`/stock/${symbol}`,
      search:`?${createSearchParams(params)}`, 
    });
  };

  return (
    <div>
      <input type="text" value={symbol} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
   </div>
  );
};

export default Searchbar;



