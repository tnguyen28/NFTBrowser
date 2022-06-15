import {
  ApplicationState,
  CollectionDataAction,
  NFTDataAction,
} from "../types/types";
import * as actionTypes from "./actionTypes";

const initialState: ApplicationState = {
  loading: true,
  nftData: {
    success: false,
    result: {
      total: 0,
      count: 0,
      nfts: [],
    },
  },
  collectionData: {
    success: false,
    result: {
      count: 0,
      collections: [],
    },
  },
};

//TODO handle typing
export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_COLLECTION:
      return {
        ...state,
        collectionData: action.collectionData,
      };
    case actionTypes.GET_NFT:
      return { ...state, nftData: action.nftData };

    //TODO CASE FAIL
    default:
      return { ...state };
  }
};
