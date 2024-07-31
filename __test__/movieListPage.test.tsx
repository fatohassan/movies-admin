import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoviesList from "../src/pages/admin/movies/MoviesList";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import renderer from "react-test-renderer";
import { listMoviesMock } from "../__mocks__/AllMovies";
import { BrowserRouter } from "react-router-dom";

const renderMovieList = () => {
  return (
    <BrowserRouter>
      <MockedProvider mocks={listMoviesMock} addTypename={false}>
        <MoviesList />
      </MockedProvider>
    </BrowserRouter>
  );
};

describe("MoviesList page rendering/navigating", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render page correctly", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <MockedProvider mocks={listMoviesMock} addTypename={false}>
            <MoviesList />
          </MockedProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display contents", async () => {
    render(renderMovieList());
    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Movies/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Create Movie")).toBeInTheDocument();
    expect(screen.getByText("Refresh")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent("Movies");
  });

  it("should display table contents", async () => {
    render(renderMovieList());
    expect(await screen.findByRole("img")).toBeInTheDocument();
    expect(await screen.findByText("Inside Out 2")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByText("Image")).toBeInTheDocument();
    expect(screen.getByText("Release Date")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(await screen.findByText("Edit")).toBeInTheDocument();
    expect(await screen.findByText("Delete")).toBeInTheDocument();
  });

  it("should display routes/links/button", async () => {
    render(renderMovieList());
    await screen.findAllByRole("link");
    screen.getAllByRole("button");
    expect(
      screen.getByRole("button", { name: /Create Movie/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Refresh/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /Delete/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: /Edit/i })
    ).toBeInTheDocument();
  });
});
