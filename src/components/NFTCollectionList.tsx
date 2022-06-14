import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

import "../styles/Grid.css";
import { NFT } from "../types/types";
import SearchBar from "./SearchBar";

interface ModalProps {
  showModal: boolean;
  collectionName: string | undefined;
  handleClose: () => void;
}

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

const itemsPerPage = 5;

const NFTCollectionList = (props: ModalProps) => {
  const [loading, setLoading] = useState(true);
  //TODO handle any type
  const [nfts, setNfts] = useState<any>(null);
  const [nftTotal, setNftTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [searchNameValue, setSearchNameValue] = useState("");

  const handlePageClick = (event: any) => {
    const newOffset = event.selected * itemsPerPage;
    setOffset(newOffset);
  };

  useEffect(() => {
    fetchData();
  }, [offset, itemsPerPage]);

  const { showModal, collectionName } = props;

  const fetchData = async () => {
    let proxyUrl = `http://localhost:8010/proxy/api/nft/nfts_filtered?nft_filter_string={"collection":"${collectionName}"}&startInclusive=${offset}&endExclusive=${
      offset + itemsPerPage
    }`;
    try {
      const response = await axios.get(proxyUrl);
      const result = response.data.result;
      setNfts(result.nfts);
      setNftTotal(result.total);
      setPageCount(Math.ceil((result.total / itemsPerPage) % result.total));
    } catch (err) {
      setNfts(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nfts && showModal) {
      fetchData();
    }

    if (showModal) {
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
        {loading ? (
          <div>nfts are loading...</div>
        ) : (
          <NFTList>
            {nftTotal > 0 ? (
              nfts
                .sort((a: any, b: any) => {
                  let aName = "";
                  let bName = "";
                  aName = a.name.toLowerCase();
                  bName = b.name.toLowerCase();
                  return aName > bName ? 1 : -1;
                })
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
                            {offerPrice} {quoteCurrency}
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
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={4}
              pageCount={pageCount}
              previousLabel="< previous"
              containerClassName={"container"}
              previousLinkClassName={"page"}
              breakClassName={"page"}
              nextLinkClassName={"page"}
              pageClassName={"page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          </NFTList>
        )}
      </ModalContent>
    </ModalBox>
  ) : null;
};

export default NFTCollectionList;
