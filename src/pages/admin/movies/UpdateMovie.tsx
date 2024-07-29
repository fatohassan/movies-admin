import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UPDATE_MOVIE_MUTATION } from "../movieQueries/moviesMutations";
import { LOAD_MOVIE } from "../movieQueries/moviesQueries";

export default function UpdateMovie() {
  const params = useParams();
  const navigate = useNavigate();

  const [updateMovie] = useMutation(UPDATE_MOVIE_MUTATION);

  const { data, loading } = useQuery(LOAD_MOVIE, {
    variables: { id: params.id },
  });
  const movie = data?.movie;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const movieObj = Object.fromEntries(formData.entries());

    try {
      await updateMovie({
        variables: {
          id: movie.id,
          movieInput: {
            original_title: movieObj?.original_title,
            release_date: movieObj?.release_date,
            vote_average: movieObj?.vote_average,
            backdrop_path: movieObj?.backdrop_path,
            overview: movieObj?.overview,
          },
        },
      });

      navigate("/admin/movies/");
    } catch (error) {
      alert("Can not connect to update movie");
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Edit Movie</h2>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">ID</label>
            <div className="col-sm-8">
              <input
                readOnly
                className="form-control-plaintext"
                defaultValue={params.id}
              />
            </div>
          </div>
         
            <form aria-label="form" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Title</label>
                <div className="col-sm-8">
                  <input
                    aria-label="title"
                    className="form-control"
                    id="original_title"
                    defaultValue={movie?.original_title}
                    name="original_title"
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Rating</label>
                <div className="col-sm-8">
                  <input
                    aria-label="rating"
                    className="form-control"
                    name="vote_average"
                    type="number"
                    defaultValue={movie?.vote_average}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Release Date</label>
                <div className="col-sm-8">
                  <input
                    aria-label="date"
                    className="form-control"
                    name="release_date"
                    defaultValue={movie?.release_date}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Description</label>
                <div className="col-sm-8">
                  <textarea
                    aria-label="overview"
                    className="form-control"
                    name="overview"
                    rows={3}
                    defaultValue={movie?.overview}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Image</label>
                <div className="col-sm-8">
                  <img
                    src={
                      movie?.image
                        ? movie?.image
                        : `https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`
                    }
                    width="200"
                  />
                  <input
                    aria-label="image"
                    className="form-control mt-4"
                    name="image"
                    type="file"
                  />
                  <span className="text-danger"></span>
                </div>
              </div>

              <div className="row">
                <div className="offset-sm-4 col-sm-4 d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <div className="col-sm-4 d-grid">
                  <Link
                  aria-label="link"
                    className="btn btn-secondary"
                    to="/admin/movies"
                    role="button"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          
        </div>
      </div>
    </div>
  );
}
