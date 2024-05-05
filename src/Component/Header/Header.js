import React from 'react'
import "./Header.css";
import { FormControl } from 'react-bootstrap';
import searchIcon from "../../assets/searchIconGrey.svg"

function Header({setSearchInput}) {

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
      };
      
  return (
    <div className="header">
        <div className="mainHeading">MARVEL</div>
        <div className="modalSearchBar">
                    <span className="searchIcon">
                      <img src={searchIcon} alt='search-icon'></img>
                    </span>
                    <FormControl
                      className="searchInput"
                      placeholder='Search for Comics...'
                      aria-describedby='basic-addon1'
                      onChange={handleSearchChange}
                    />
                  </div>
    </div>
  )
}

export default Header