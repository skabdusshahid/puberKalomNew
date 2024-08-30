import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchComponent.css';

const SearchComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className="col d-flex gap-3 align-items-center search-container">
      <Link to="#" className="search-icon" id="google-search" onClick={toggleSearch}>
        <i className="bi bi-search" />
      </Link>
      {searchVisible && (
        <form action="./home/search" method="get" id="cse-search-box">
          <input type="hidden" defaultValue="5d07de91748e84546" name="cx" />
          <Link to="#" className="close-icon" onClick={toggleSearch}>
            <i className="bi bi-x-lg" />
          </Link>
          <input type="hidden" name="cof" defaultValue="FORID:10" />
          <input type="hidden" defaultValue="UTF-8" name="ie" />
          <input name="q" type="text" placeholder="Search....." />
          <button type="submit">
            <i className="bi bi-search" />
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchComponent;
