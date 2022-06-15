import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getCollectionAction = (
  collectionType: string,
  offset: number,
  endOffset: number
) => {
  return fetchCollectionRequest(collectionType, offset, endOffset);
};

export const getNFTAction = (
  collectionName: string,
  offset: number,
  endOffset: number
) => {
  return fetchNFTRequest(collectionName, offset, endOffset);
};

export const fetchCollectionRequest =
  (collectionType: string, offset: number, endOffset: number) =>
  async (dispatch: any) => {
    dispatch({
      type: actionTypes.IS_LOADING,
      loading: true,
    });
    const url = `http://localhost:8010/proxy/api/nft/collections_page?collectionType=${collectionType}&startInclusive=${offset}&endExclusive=${endOffset}`;
    await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.GET_COLLECTION,
          collectionData: data,
        });
      });
  };

export const fetchNFTRequest =
  (collectionName: string, offset: number, endOffset: number) =>
  async (dispatch: any) => {
    const url = `http://localhost:8010/proxy/api/nft/nfts_filtered?nft_filter_string={"collection":"${collectionName}"}&startInclusive=${offset}&endExclusive=${endOffset}`;
    await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.GET_NFT,
          nftData: data,
        });
      });
  };
