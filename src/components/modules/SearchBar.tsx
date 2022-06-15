import React from "react";
import styled from "styled-components";

const Search = styled.div`
  display: flex;
  & > input {
    width: 200px;
    height: 50px;
  }
  & > h2 {
    margin: 0 10px 0 0;
  }
  margin: 15px;
`;

interface SearchBarProps {
  setSearchNameValue: (value: string) => void;
  searchNameValue: string
}

const SearchBar = (props:SearchBarProps) => {
  return (
    <Search>
      <h2>search by name</h2>
      <input
        type="text"
        name="name"
        value={props.searchNameValue}
        onChange={(e) => props.setSearchNameValue(e.target.value)}
      />
    </Search>
  );
};

export default SearchBar;
