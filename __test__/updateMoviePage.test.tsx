import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdateMovie from "../src/pages/admin/movies/UpdateMovie";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import { updateMovieMutationsMock } from "../__mocks__/AllMovies";

const renderUpdateMovie = () => {
  return (
    <BrowserRouter>
      <MockedProvider mocks={updateMovieMutationsMock} addTypename={false}>
        <UpdateMovie />
      </MockedProvider>
    </BrowserRouter>
  );
};
describe("Update Movie rendering navigating", () => {
  it("should render page correctly", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <MockedProvider mocks={updateMovieMutationsMock} addTypename={false}>
            <UpdateMovie />
          </MockedProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display contents", () => {
    render(renderUpdateMovie());
    const headingElement = screen.getByRole("heading", {
      name: /Edit Movie/i,
    });
    expect(headingElement).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeVisible();
  });

  it("should display form contents/inputs/buttons", async () => {
    render(renderUpdateMovie());

    screen.getByLabelText("form");
    await screen.findByText("Title");
    expect(await screen.findByText("Title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeTruthy();
    expect(screen.getByLabelText("link")).toHaveTextContent("Cancel");
  });

  it("should be able to type in title inuput", () => {
    render(renderUpdateMovie());
    const inputTitle = screen.getByLabelText("title");
    expect(
      fireEvent.change(inputTitle, { EventTarget: { value: "Inside Out 2" } })
    ).toBeTruthy();
  });

  it("should be able to type in rating inuput", () => {
    render(renderUpdateMovie());
    const inputRating = screen.getByLabelText("rating");
    expect(
      fireEvent.change(inputRating, { EventTarget: { value: "1" } })
    ).toBeTruthy();
  });

  it("should be able to type in description inuput", () => {
    render(renderUpdateMovie());
    const inputOverview = screen.getByLabelText("overview");
    fireEvent.change(inputOverview, { EventTarget: { value: "Good Movie" } });
    expect(inputOverview).toBeVisible();
  });

  it("should be able to type in description inuput", () => {
    render(renderUpdateMovie());
    const inputReleaseDate = screen.getByLabelText("date");
    expect(
      fireEvent.change(inputReleaseDate, {
        EventTarget: { value: "01-02-2024" },
      })
    ).not.toBeFalsy();
  });

  it("should be able to type in image inuput", () => {
    render(renderUpdateMovie());
    const inputImage = screen.getByLabelText("image");
    expect(inputImage).toBeInTheDocument();
  });
});
