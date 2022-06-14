import React from "react";
import styled from'styled-components'

import { ThreeDots } from "react-loader-spinner";

interface LoadingProps {
  loading: string;
}

const LoaderWrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding-top: 50px;
`

const Loading = (props: LoadingProps) => {
  return (
    <LoaderWrapper>
      one moment, {props.loading} collection data is loading...
      <ThreeDots height="100" width="100" color="blue" ariaLabel="loading" />
    </LoaderWrapper>
  );
};

export default Loading;
