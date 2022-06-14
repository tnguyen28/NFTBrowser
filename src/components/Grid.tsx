import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ImageCard from "./ImageCard";
import Loading from "./Loading";
import styled from "styled-components";
import "../styles/Grid.css";

import { Collection } from "../types/types";
import SelectCollectionType from "./SelectCollectionType";
import SearchBar from "./SearchBar";

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

const Grid = () => {
  const [isLoading, setLoading] = useState(true);
  const [collectionType, setCollectionType] = useState("all");
  const [collections, setCollections] = useState<any>(null);
  const [searchNameValue, setSearchNameValue] = useState("");

  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const handlePageClick = (event: any) => {
    const newOffset = event.selected * itemsPerPage;
    setOffset(newOffset);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [offset, itemsPerPage]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [collectionType]);

  const fetchData = async () => {
    let proxyUrl = `http://localhost:8010/proxy/api/nft/collections_page?collectionType=${collectionType}&startInclusive=${offset}&endExclusive=${
      offset + itemsPerPage
    }`;
    try {
      const response = await axios.get(proxyUrl);
      const collection = response.data;
      setPageCount(
        Math.ceil(
          (collection.result.count / itemsPerPage) % collection.result.count
        )
      );
      setCollections(collection);
    } catch (err) {
      setCollections(null);
    } finally {
      setLoading(false);
    }
  };

  const renderList = () => {
    return (
      <>
        {collections &&
          collections.result.collections
            // .slice(offset, offset + itemsPerPage)
            .sort((a: any, b: any) => {
              let aName = "";
              let bName = "";
              aName = a.collectionDict?.name.toLowerCase();
              bName = b.collectionDict?.name.toLowerCase();
              return aName > bName ? 1 : -1;
            })
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
      {isLoading ? (
        <Loading loading={collectionType} />
      ) : (
        <>
          <SearchBar
            searchNameValue={searchNameValue}
            setSearchNameValue={setSearchNameValue}
          />
          <Results>
            <p>{collections && collections.result.count} results found</p>
          </Results>
          <GridList>{renderList()}</GridList>
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
        </>
      )}
    </div>
  );
};

export default Grid;
