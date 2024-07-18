import { gql } from "@apollo/client";

export const CREATE_MOVIE_MUTATION = gql`
  mutation createMovie($movieInput: MovieInput) {
    createMovie(movieInput: $movieInput) {
      original_title
      release_date
      vote_average
      backdrop_path
      overview
      image
    }
  }
`;

export const DELETE_MOVIE_MUTATION = gql`
  mutation deleteMovie($id: String!) {
    deleteMovie(ID: $id)
  }
`;
export const UPDATE_MOVIE_MUTATION = gql`
  mutation updateMovie($id: String!, $movieInput: MovieInput) {
    updateMovie(ID: $id, movieInput: $movieInput) {
      original_title
      release_date
      vote_average
      backdrop_path
      overview
      image
    }
  }
`;
