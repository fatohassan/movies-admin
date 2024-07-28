import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_MOVIE_MUTATION } from "../movieQueries/moviesMutations";

export default function CreateMovie() {
  const [form, setForm] = useState<any>({
    original_title: "",
    release_date: "",
    vote_average: "",
    backdrop_path: "",
    overview: "",
  });

  const [image, setImage] = useState("");
  const [createMovie] = useMutation(CREATE_MOVIE_MUTATION);
  const navigate = useNavigate();


  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImage(base64 as string);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);

        fileReader.onerror = (error) => {
          reject(error);
        };
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<any>) => {
    try {
      await createMovie({
        variables: {
          movieInput: {
            original_title: form.original_title,
            release_date: form.release_date,
            vote_average: form.vote_average,
            backdrop_path: form.backdrop_path,
            overview: form.overview,
            image: image,
          },
        },
      });
      
      setForm({
        original_title: "",
        release_date: "",
        vote_average: "",
        backdrop_path: "",
        overview: "",
      });
      navigate("/admin/movies/");
    } catch (error) {
      console.log(error);
     
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Movie</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Title</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="original_title"
                  value={form.original_title}
                  name="original_title"
                  onChange={(event: any) =>
                    setForm({
                      ...form,
                      original_title: event.currentTarget.value,
                    })
                  }
                />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Rating</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="vote_average"
                  value={form.vote_average}
                  name="vote_average"
                  onChange={(event: any) =>
                    setForm({
                      ...form,
                      vote_average: event.currentTarget.value,
                    })
                  }
                  type="number"
                />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Release Date</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="release_date"
                  value={form.release_date}
                  name="release_date"
                  onChange={(event: any) =>
                    setForm({
                      ...form,
                      release_date: event.currentTarget.value,
                    })
                  }
                />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  id="overview"
                  value={form.overview}
                  name="overview"
                  onChange={(event: any) =>
                    setForm({ ...form, overview: event.currentTarget.value })
                  }
                  rows={3}
                />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Image</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={(event) => {
                    uploadImage(event);
                  }}
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
