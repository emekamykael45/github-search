import { render, screen, fireEvent } from "@testing-library/react";

import SearchForm from "../components/search-form";

test("renders search form", () => {
  render(<SearchForm onSearch={jest.fn()} />);
  expect(screen.getByPlaceholderText("Search GitHub")).toBeInTheDocument();
  expect(screen.getByText("Users")).toBeInTheDocument();
  expect(screen.getByText("Organizations")).toBeInTheDocument();
  expect(screen.getByText("Search")).toBeInTheDocument();
});

test("submits the form with correct data", () => {
  const handleSearch = jest.fn();
  render(<SearchForm onSearch={handleSearch} />);

  fireEvent.change(screen.getByPlaceholderText("Search GitHub"), {
    target: { value: "test" },
  });
  fireEvent.click(screen.getByText("Organizations"));
  fireEvent.click(screen.getByText("Search"));

  expect(handleSearch).toHaveBeenCalledWith("test", "orgs");
});
