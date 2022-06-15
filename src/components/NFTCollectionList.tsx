import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import styled from "styled-components";
import { getNFTAction } from "../store/actionCreators";

import "../styles/Grid.css";
import { ApplicationState, NFT } from "../types/types";
import SearchBar from "./SearchBar";

const ModalBox = styled.div`
  background-color: #06283d;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  overflow-y: auto;
  width: 100%;
  height: auto;
`;

const ModalHeader = styled.h2`
  text-align: center;
  color: white;
  font-weight: bold;
`;

const NFTItem = styled.div`
  background-color: #47b5ff;
  display: flex;
  border: 1px solid black;
`;

const NFTItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px 0 15px;
  text-align: left;
`;

const NFTListing = styled.div`
  display: flex;
`;

const NFTList = styled.div``;

const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;

interface ModalProps {
  showModal: boolean;
  collectionName: string;
  handleClose: () => void;
  onGetNFT: (collectionType: string, offset: number, endOffset: number) => void;
}

const itemsPerPage = 5;

const NFTCollectionList = (props: ModalProps & ApplicationState) => {
  const [offset, setOffset] = useState(0);
  const [searchNameValue, setSearchNameValue] = useState("");

  const { nftData, showModal, collectionName } = props;
  const total = nftData?.result.total;
  const endOffset = offset + itemsPerPage;

  const handlePageClick = (event: any) => {
    const newOffset = event.selected * itemsPerPage;
    setOffset(newOffset);
  };

  useEffect(() => {
    if (showModal) {
      props.onGetNFT(collectionName, offset, endOffset);
    }
  }, [offset, itemsPerPage]);

  useEffect(() => {
    if (showModal) {
      props.onGetNFT(collectionName, offset, endOffset);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);
  return showModal ? (
    <ModalBox>
      <ModalHeader>{collectionName?.toLocaleUpperCase()}</ModalHeader>
      <SearchBar
        searchNameValue={searchNameValue}
        setSearchNameValue={setSearchNameValue}
      />
      <CloseModalButton onClick={() => props.handleClose()}>X</CloseModalButton>
      <ModalContent>
        <NFTList>
          {nftData && total > 0 ? (
            nftData.result.nfts
              // .sort((a: any, b: any) => {
              //   let aName = "";
              //   let bName = "";
              //   aName = a.name.toLowerCase();
              //   bName = b.name.toLowerCase();
              //   return aName > bName ? 1 : -1;
              // })
              .filter((nft: NFT) =>
                nft.name.match(new RegExp(searchNameValue, "i"))
              )
              .map((nft: any) => {
                const {
                  imageUrl,
                  name,
                  offerPrice,
                  quoteCurrency,
                  auction,
                  id,
                } = nft;
                let bestBid = auction ? auction.bestBid : "N/A";
                let bidTime = auction ? auction.bidTime : "N/A";

                return (
                  <NFTItem key={id}>
                    <img
                      src={imageUrl !== null ? imageUrl : ""}
                      width="250px"
                      height="250px"
                    />
                    <NFTItemDescription>
                      <h2>{name}</h2>
                      <NFTListing>
                        <h3>Price: </h3>
                        <p>
                          {offerPrice
                            ? `${offerPrice} ${quoteCurrency}`
                            : `N/A`}
                        </p>
                      </NFTListing>
                      <NFTListing>
                        <h3>Best Bid: </h3>
                        <p>{bestBid}</p>
                      </NFTListing>
                      <NFTListing>
                        <h3>Bid Time: </h3>
                        <p>{bidTime}</p>
                      </NFTListing>
                    </NFTItemDescription>
                  </NFTItem>
                );
              })
          ) : (
            <NoResults>
              <p>No Results...</p>
            </NoResults>
          )}
          {total ? (
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={4}
              pageCount={Math.ceil((total / itemsPerPage) % total)}
              previousLabel="< previous"
              containerClassName={"container"}
              previousLinkClassName={"page"}
              breakClassName={"page"}
              nextLinkClassName={"page"}
              pageClassName={"page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          ) : (
            <></>
          )}
        </NFTList>
      </ModalContent>
    </ModalBox>
  ) : null;
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    collectionData: state.collectionData,
    nftData: state.nftData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetNFT: (collectionName: string, offset: number, endOffset: number) => {
      dispatch(getNFTAction(collectionName, offset, endOffset));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NFTCollectionList);
