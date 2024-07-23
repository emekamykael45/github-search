import { render, screen } from "@testing-library/react";

import Results from "../components/results";

const mockResults = [
  {
    id: 1,
    login: "testuser",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    html_url: "https://github.com/testuser",
  },
];

test("renders loading state", () => {
  render(<Results results={[]} isLoading={true} error={null} />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("renders error state", () => {
  render(
    <Results
      results={[]}
      isLoading={false}
      error={new Error("Error fetching results")}
    />
  );
  expect(screen.getByText("Error fetching results")).toBeInTheDocument();
});

test("renders no results state", () => {
  render(<Results results={[]} isLoading={false} error={null} />);
  expect(screen.getByText("No results found")).toBeInTheDocument();
});

test("renders results", () => {
  render(<Results results={mockResults} isLoading={false} error={null} />);
  expect(screen.getByText("testuser")).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    "https://avatars.githubusercontent.com/u/1?v=4"
  );
  expect(screen.getByText("View Profile")).toHaveAttribute(
    "href",
    "https://github.com/testuser"
  );
});
