import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  image: string;
  // id: number;
};

export default function CreateProduct() {
  const [validationErrors, setValidationErrors] = useState<Props>();
  const [errors, setErrors] = useState({});

  const [uploadedFile, setUploadedFile] = useState<string>();

  const navigate = useNavigate();

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setUploadedFile(base64 as string);
    console.log(base64);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const movie = Object.fromEntries(formData.entries());
    console.log(movie);
    movie["image"] = uploadedFile as FormDataEntryValue;
    try {
      const response = await axios.post("http://localhost:5000/movie", movie, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;

      if (response.status === 201) {
        navigate("/admin/movies/");
      }

      if (response.status === 400) {
        console.log(data);
      }

      // setValidationErrors(data)
    } catch (error) {
      console.log(error);

      alert("unable to connect to server");
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Product</h2>

          <form onSubmit={handleSubmit}>
            {/* <div className="row mb-3">
              <label className="col-sm-4 col-form-label">ID</label>
              <div className="col-sm-8">
                <input className="form-control" name="id" />
                <span className="text-danger">{}</span>
              </div>
            </div> */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Title</label>
              <div className="col-sm-8">
                <input className="form-control" name="original_title" />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Rating</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="vote_average"
                  type="number"
                />
                <span className="text-danger">
                  {validationErrors?.vote_average}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Release Date</label>
              <div className="col-sm-8">
                <input className="form-control" name="release_date" />
                <span className="text-danger">
                  {validationErrors?.release_date}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea className="form-control" name="overview" rows={3} />
                <span className="text-danger">
                  {validationErrors?.overview}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Image</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="image"
                  type="file"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
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
