import { useEffect, useState, FC } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../components/LoadingComp";
import { useMutation, useQuery } from "@apollo/client";
import { LOAD_MOVIES } from "../movieQueries/moviesQueries";
import { DELETE_MOVIE_MUTATION } from "../movieQueries/moviesMutations";

type Movie = {
  id: string;
  original_title: string;
  vote_average: number;
  release_date: string;
  backdrop_path: string;
  image: string;
};

const MoviesList = () => {
  const { error, loading, data: movies, refetch } = useQuery(LOAD_MOVIES);
  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION);

  const deleteMovieMutation = async (id: string) => {
    await deleteMovie({
      variables: {
        id: id,
      },
    });

    refetch();
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Movies</h2>

      <div className="row mb-3">
        <div className="col">
          <Link
            className="btn btn-primary me-1"
            to="/admin/movies/create"
            role="button"
          >
            Create Movie
          </Link>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => refetch()}
          >
            Refresh
          </button>
        </div>
        <div className="col"></div>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Rating</th>
              <th>Image</th>
              <th>Release Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.getMoviesList.map((movie, index) => {
              return (
                <tr key={index}>
                  <td>{movie.original_title}</td>
                  <td>{movie.vote_average}</td>
                  <td>
                    <img
                      src={
                        movie.image
                          ? movie.image
                          : `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                      }
                      width="100"
                      alt="..."
                    />
                  </td>
                  <td>{movie.release_date}</td>
                  <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                    <Link
                      className="btn btn-primary btn-sm me-1"
                      to={`/admin/movies/update/${movie.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteMovieMutation(movie.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default MoviesList;
