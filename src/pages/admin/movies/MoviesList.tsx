import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../components/LoadingComp";

type Movie = {
  id: number;
  original_title: string;
  vote_average: number;
  release_date: string;
  backdrop_path: string;
};

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovie = async () => {
    const res = await axios.get("http://localhost:5000/");
    const data = await res.data;
    setMovies(data);
  };

  useEffect(() => {
    fetchMovie();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
            onClick={fetchMovie}
          >
            Refresh
          </button>
        </div>
        <div className="col"></div>
      </div>

      {isLoading ? (
        <LoadingComponent />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Image</th>
              <th>Release Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => {
              return (
                <tr key={index}>
                  <td>{movie.id}</td>
                  <td>{movie.original_title}</td>
                  <td>{movie.vote_average}</td>
                  <td>
                    <img
                      src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                      width="100"
                      alt="..."
                    />
                  </td>
                  <td>{movie.release_date}</td>
                  <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                    <Link
                      className="btn btn-primary btn-sm me-1"
                      // add the id to be edited
                      to={"/admin/movies/edit/"}
                    >
                      Edit
                    </Link>
                    <button type="button" className="btn btn-danger btn-sm">
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
}
