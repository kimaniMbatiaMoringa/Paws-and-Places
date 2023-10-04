import React from "react";

const SearchBar = ({searchTerm, onSearchChange }) =>{
    return (
        <div className="container">
            <input 
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={onSearchChange}
            />
        </div>
    )
}