import React, { useState } from "react";
import styled from "styled-components";
import { Collection } from "../types/types";
import NFTCollectionList from "./NFTCollectionList";

export interface ImageCardProps extends Partial<Collection> {
  avatarImageUrl: string | undefined;
  name: string | undefined;
}

const CardTitle = styled.div`
  text-align: center;
`;

const Image = styled.img`
  border-bottom: 1px solid;
`;

const Card = styled.div`
  border: 1px solid;
  margin: 10px;
  width: 250px;
  height: 325px;
  &:hover {
    cursor: pointer
  };
  shadowColor: #000;
shadowOffset: {
	width: 0,
	height: 2,
};
shadowOpacity: 0.25;
shadowRadius: 3.84;
elevation: 5;
`;

const ImageCard = (props: ImageCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const { avatarImageUrl, name } = props;

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card onClick={(e) => setShowModal(!showModal)}>
        <Image src={avatarImageUrl} height="250px" width="250px" />
        <CardTitle>
          <p>{name}</p>
        </CardTitle>
      </Card>
      <NFTCollectionList
        handleClose={handleClose}
        showModal={showModal}
        collectionName={name}
      />
    </>
  );
};

export default ImageCard;
