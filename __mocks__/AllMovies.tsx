import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { renderHook } from "@testing-library/react";
import React from "react";
import  MoviesList  from "../src/pages/admin/movies/MoviesList";
import { LOAD_MOVIES } from "../src/pages/admin/movieQueries/moviesQueries";

export const AllMovies = {
    getMoviesList: [
    {
      id: "66715c4f88c42067190e070f",
      original_title: "Inside Out 2",
      release_date: "2024-06-11",
      vote_average: "7.761",
      backdrop_path: "/coATv42PoiLqAFKStJiMZs2r6Zb.jpg",
      image: null,
      overview:
        "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    },
  ],
};

// successful mock of getMovieList
export const successfulMoviesMock: MockedResponse[]= [
    {
        request: {
            query: LOAD_MOVIES
        },
        result: {
            data: AllMovies
        }
    }
] 

export function getAllMoviesWrapper(mockData: MockedResponse[] = []) {
    const wrapper =({children}: React.PropsWithChildren) => (
        <MockedProvider mocks={mockData} addTypename={false}>
            {children}
        </MockedProvider>
    );
    const {result}:any = renderHook(() => MoviesList(), {wrapper})
    return {
        result
    }
}
