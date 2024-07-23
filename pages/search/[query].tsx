import React from "react";
import { GetServerSideProps } from "next";

import Home from "../index";

interface SearchProps {
  initialQuery: string;
  initialType: string;
}

const Search: React.FC<SearchProps> = ({ initialQuery, initialType }) => {
  return <Home initialQuery={initialQuery} initialType={initialType} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  return {
    props: {
      initialQuery: params?.query || "",
      initialType: query.type || "users",
    },
  };
};

export default Search;
