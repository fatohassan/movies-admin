import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateMovie from "../src/pages/admin/movies/CreateMovie";
import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { createMovieMutationsMock } from "../__mocks__/AllMovies";

const renderCreateMovie = () => {
  return (
    <BrowserRouter>
      <MockedProvider mocks={createMovieMutationsMock} addTypename={false}>
        <CreateMovie />
      </MockedProvider>
    </BrowserRouter>
  );
};

describe("Create Movie rendering navigating", () => {
  it("should render page correctly", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <MockedProvider mocks={createMovieMutationsMock} addTypename={false}>
            <CreateMovie />
          </MockedProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display contents", () => {
    render(renderCreateMovie());
    const headingElement = screen.getByRole("heading", {
      name: /Create Movie/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("should display form and link", async () => {
    render(renderCreateMovie());
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByLabelText("link")).toHaveTextContent("Cancel");
  });

  it("should be able to type in title inuput", () => {
    render(renderCreateMovie());
    const inputTitle = screen.getByLabelText("title");
    expect(
      fireEvent.change(inputTitle, { EventTarget: { value: "Inside Out 2" } })
    ).toBeTruthy();
  });

  it("should be able to type in rating inuput", () => {
    render(renderCreateMovie());
    const inputRating = screen.getByLabelText("rating");
    expect(
      fireEvent.change(inputRating, { EventTarget: { value: "1" } })
    ).toBeTruthy();
  });

  it("should be able to type in description inuput", () => {
    render(renderCreateMovie());
    const inputOverview = screen.getByLabelText("overview");
    fireEvent.change(inputOverview, { EventTarget: { value: "Good Movie" } });
    expect(inputOverview).toBeVisible();
  });

  it("should be able to type in description inuput", () => {
    render(renderCreateMovie());
    const inputReleaseDate = screen.getByLabelText("date");
    expect(
      fireEvent.change(inputReleaseDate, {
        EventTarget: { value: "01-02-2024" },
      })
    ).not.toBeFalsy();
  });

  it("should be able to type in image inuput", () => {
    render(renderCreateMovie());
    const inputImage = screen.getByLabelText("image");
    expect(inputImage).toBeInTheDocument();
  });
});
