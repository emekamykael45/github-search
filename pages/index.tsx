import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";

import SearchForm from "../components/search-form";
import Results from "../components/results";

const fetchResults = async (query: string, type: string) => {
  const endpoint =
    type === "users"
      ? `search/users?q=${encodeURIComponent(query)}`
      : `search/users?q=${encodeURIComponent(query)}+type:org`;

  try {
    const { data } = await axios.get(`https://api.github.com/${endpoint}`);
    return data.items;
  } catch (error) {
    throw new Error("Error fetching results");
  }
};

interface HomeProps {
  initialQuery?: string;
  initialType?: string;
}

const Home: React.FC<HomeProps> = ({
  initialQuery = "",
  initialType = "users",
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);

  const { data, error, isLoading } = useQuery({
    queryKey: ["search", query, type],
    queryFn: () => fetchResults(query, type),
    enabled: !!query,
    retry: false,
  });

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setType(initialType);
    }
  }, [initialQuery, initialType]);

  const handleSearch = (searchQuery: string, searchType: string) => {
    setQuery(searchQuery);
    setType(searchType);
    router.push(`/search/${searchQuery}?type=${searchType}`);
  };

  return (
    <div className="container max-w-[450px] mx-auto p-4">
      <h1 className="text-2xl font-semibold">Github Search App</h1>

      <SearchForm onSearch={handleSearch} />
      <Results results={data || []} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Home;
