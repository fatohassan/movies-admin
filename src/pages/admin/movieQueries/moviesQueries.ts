import { gql } from "@apollo/client";

export const LOAD_MOVIES = gql`
  query {
    getMoviesList {
      id
      original_title
      release_date
      vote_average
      backdrop_path
      overview
      image
    }
  }
`;

export const LOAD_MOVIE = gql`
  query movie($id: String!) {
    movie(ID: $id) {
      id
      original_title
      release_date
      vote_average
      backdrop_path
      overview
      image
    }
  }
`;
