import React from "react";
import styled from "styled-components";

interface SelectCollectionTypeProps {
  setCollectionType: (value: string) => void;
  collectionType: string;
}

const CollectionType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: "#3f51b5";
  padding: 10px 30px;
  border-radius: 5px;
  outline: 0;
  margin: 10px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: "#283593";
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

const buttonList = ["all", "ftx", "sol", "eth"];

const SelectCollectionType = (props: SelectCollectionTypeProps) => {
  const { setCollectionType, collectionType } = props;
  return (
    <CollectionType>
      {buttonList &&
        buttonList.map((name) => {
          return (
            <Button
              key={name}
              disabled={collectionType === name}
              onClick={() => setCollectionType(name)}
            >
              {name.toLocaleUpperCase()}
            </Button>
          );
        })}
    </CollectionType>
  );
};

export default SelectCollectionType;
