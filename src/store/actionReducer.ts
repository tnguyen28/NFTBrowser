import {
  ApplicationState,
} from "../types/types";
import * as actionTypes from "./actionTypes";

const initialState: ApplicationState = {
  loading: false,
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
    case actionTypes.IS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_COLLECTION:
      return {
        ...state,
        collectionData: action.collectionData,
        loading: false,
      };
    case actionTypes.GET_NFT:
      return {
        ...state,
        nftData: action.nftData,
        loading: false,
      };

    //TODO CASE FAIL
    default:
      return { ...state };
  }
};
