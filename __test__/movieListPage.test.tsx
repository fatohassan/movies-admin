import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoviesList from "../src/pages/admin/movies/MoviesList";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { listMoviesMock } from "../__mocks__/AllMovies";
import { BrowserRouter } from "react-router-dom";

describe("MoviesList page rendering/navigating", () => {
  afterEach(() => {
    cleanup();
  });

  it("should display contents", async () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={listMoviesMock} addTypename={false}>
          <MoviesList />
        </MockedProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Movies/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Create Movie")).toBeInTheDocument();
    expect(screen.getByText("Refresh")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent("Movies");
  });

  it("should display table contents", async () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={listMoviesMock} addTypename={false}>
          <MoviesList />
        </MockedProvider>
      </BrowserRouter>
    );
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
    render(
      <BrowserRouter>
        <MockedProvider mocks={listMoviesMock} addTypename={false}>
          <MoviesList />
        </MockedProvider>
      </BrowserRouter>
    );
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
