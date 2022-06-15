import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ImageCard from "./ImageCard";
import Loading from "./Loading";
import styled from "styled-components";
import "../styles/Grid.css";

import { ApplicationState, Collection } from "../types/types";
import SelectCollectionType from "./SelectCollectionType";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import { getCollectionAction } from "../store/actionCreators";

const GridList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const itemsPerPage = 10;

//TODO SET TO COLLECTIONS
type CollectionType = {
  success: Boolean;
  result: {
    count: number;
    collections: Collection;
  };
};

interface GridProps {
  onGetCollection: (
    collectionType: string,
    offset: number,
    endOffset: number
  ) => void;
}

const Grid = (props: GridProps & ApplicationState) => {
  const [collectionType, setCollectionType] = useState("all");
  const [searchNameValue, setSearchNameValue] = useState("");

  //pagination
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { collectionData, loading } = props;
  const count = collectionData.result.count;
  const endOffset = offset + itemsPerPage;

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    const newOffset = event.selected * itemsPerPage;
    setOffset(newOffset);
  };

  useEffect(() => {
    props.onGetCollection(collectionType, offset, endOffset);
  }, [offset]);

  useEffect(() => {
    props.onGetCollection(collectionType, offset, endOffset);
  }, [collectionType]);

  const renderList = () => {
    return (
      <>
        {collectionData &&
          collectionData.result.collections
            //TODO immutable state
            // .sort((a: any, b: any) => {
            //   let aName = "";
            //   let bName = "";
            //   aName = a.collectionDict?.name.toLowerCase();
            //   bName = b.collectionDict?.name.toLowerCase();
            //   return aName > bName ? 1 : -1;
            // })
            .filter((col: Collection) =>
              col.collectionDict?.name.match(new RegExp(searchNameValue, "i"))
            )
            .map((col: Collection, index: any) => (
              <ImageCard
                key={index}
                avatarImageUrl={col.first_nft.imageUrl}
                name={col.group_id}
              />
            ))}
      </>
    );
  };

  return (
    <div>
      <SelectCollectionType
        setCollectionType={setCollectionType}
        collectionType={collectionType}
      />
      {loading ? (
        <Loading loading={collectionType} />
      ) : (
        <>
          <SearchBar
            searchNameValue={searchNameValue}
            setSearchNameValue={setSearchNameValue}
          />
          {collectionData && (
            <Results>
              <p>{collectionData.result.count} total results found</p>
            </Results>
          )}
          <GridList>{renderList()}</GridList>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={Math.ceil(count / itemsPerPage)}
            forcePage={currentPage}
            previousLabel="< previous"
            containerClassName={"container"}
            previousLinkClassName={"page"}
            breakClassName={"page"}
            nextLinkClassName={"page"}
            pageClassName={"page"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    loading: state.loading,
    collectionData: state.collectionData,
    nftData: state.nftData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetCollection: (
      collectionType: string,
      offset: number,
      endOffset: number
    ) => {
      dispatch(getCollectionAction(collectionType, offset, endOffset));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Grid);
