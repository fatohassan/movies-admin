import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdateMovie from "../src/pages/admin/movies/UpdateMovie";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { updateMovieMutationsMock } from "../__mocks__/AllMovies";

describe("Update Movie rendering navigating", () => {
  render(
    <BrowserRouter>
      <MockedProvider mocks={updateMovieMutationsMock} addTypename={false}>
        <UpdateMovie />
      </MockedProvider>
    </BrowserRouter>
  );

  it("should display contents", () => {
    const headingElement = screen.getByRole("heading", {
      name: /Edit Movie/i,
    });
    expect(headingElement).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeVisible();
  });

  it("should display form contents/inputs/buttons", async () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={updateMovieMutationsMock} addTypename={false}>
          <UpdateMovie />
        </MockedProvider>
      </BrowserRouter>
    );

    screen.getByLabelText("form");
    await screen.findByText("Title");
    expect(await screen.findByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByText("Image")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Release Date")).toBeInTheDocument();
    expect(screen.getByLabelText("title")).toBeInTheDocument();
    expect(screen.getByLabelText("rating")).toBeInTheDocument();
    expect(screen.getByLabelText("date")).toBeInTheDocument();
    expect(screen.getByLabelText("image")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeTruthy();
    expect(screen.getByLabelText("link")).toHaveTextContent("Cancel");
  });

  it("should be able to type in title inuput", () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={updateMovieMutationsMock} addTypename={false}>
          <UpdateMovie />
        </MockedProvider>
      </BrowserRouter>
    );
    const inputTitle = screen.getByLabelText("title");
    expect(
      fireEvent.change(inputTitle, { EventTarget: { value: "Inside Out 2" } })
    ).toBeTruthy();
  });

  it("should be able to type in rating inuput", () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={updateMovieMutationsMock} addTypename={false}>
          <UpdateMovie />
        </MockedProvider>
      </BrowserRouter>
    );
    const inputRating = screen.getByLabelText("rating");
    expect(
      fireEvent.change(inputRating, { EventTarget: { value: "1" } })
    ).toBeTruthy();
  });

  it("should be able to type in description inuput", () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={updateMovieMutationsMock} addTypename={false}>
          <UpdateMovie />
        </MockedProvider>
      </BrowserRouter>
    );
    const inputOverview = screen.getByLabelText("overview");
    fireEvent.change(inputOverview, { EventTarget: { value: "Good Movie" } });
    expect(inputOverview).toBeVisible();
  });

  it("should be able to type in description inuput", () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={updateMovieMutationsMock} addTypename={false}>
          <UpdateMovie />
        </MockedProvider>
      </BrowserRouter>
    );
    const inputReleaseDate = screen.getByLabelText("date");
    expect(
      fireEvent.change(inputReleaseDate, {
        EventTarget: { value: "01-02-2024" },
      })
    ).not.toBeFalsy();
  });

  it("should be able to type in image inuput", () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={updateMovieMutationsMock} addTypename={false}>
          <UpdateMovie />
        </MockedProvider>
      </BrowserRouter>
    );
    const inputImage = screen.getByLabelText("image");
    expect(inputImage).toBeInTheDocument();
  });
});
