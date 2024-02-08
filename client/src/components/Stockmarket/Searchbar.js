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
    <div className='box-content rounded-md m-5 border-solid border-2 border-black'>
      <input className='h-10 round-md' placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={symbol} onChange={handleInputChange} />
      <button className='bg-blue-500 h-10 border-black' onClick={handleSearch}>Search</button>     
   </div>
  );
};

export default Searchbar;



