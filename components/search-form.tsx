import React, { useState, FormEvent } from "react";

interface SearchFormProps {
  onSearch: (query: string, type: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("users");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query, type);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <div className="flex space-x-4">
        <label>
          <input
            className="mr-2"
            type="radio"
            value="users"
            checked={type === "users"}
            onChange={() => setType("users")}
          />
          Users
        </label>
        <label>
          <input
            className="mr-2"
            type="radio"
            value="orgs"
            checked={type === "orgs"}
            onChange={() => setType("orgs")}
          />
          Organizations
        </label>
      </div>

      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub"
          className="p-2 border w-full"
        />

        <button type="submit" className="p-2 bg-blue-500 text-white">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
