import React from "react";
import Image from "next/image";

interface Result {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface ResultsProps {
  results: Result[];
  isLoading: boolean;
  error: unknown;
}

const Results: React.FC<ResultsProps> = ({ results, isLoading, error }) => {
  if (isLoading) return <div className="mt-6">Loading...</div>;
  if (error) return <div className="mt-6">Error fetching results</div>;
  if (results.length === 0) return <div className="mt-6">No results found</div>;

  return (
    <ul className="mt-6 space-y-4">
      {results.map((result) => (
        <li
          key={result.id}
          className="flex items-center space-x-3 p-2.5 border rounded"
        >
          <Image
            src={result.avatar_url}
            alt={result.login}
            className="w-13 h-13 rounded-full border"
            width={50}
            height={50}
          />
          <div>
            <h3 className="font-semibold">{result.login}</h3>
            <a
              className="text-sm text-cyan-600 font-medium underline"
              href={result.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Results;
