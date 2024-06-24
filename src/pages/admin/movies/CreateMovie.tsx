import axios from "axios";
// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateProduct() {
  // const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const movie = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        "http://localhost:5000/movie",
        formData
      );
      const data = await response.data;

      if (response.status === 201) {
        navigate("/admin/movies/");
      } else if (response.status === 400) {
        alert("validation error");
      } else {
        alert("unable to create movie");
      }
    } catch (error) {
      console.log(error);
      alert("unable to connect to server");
    }
  };

  type elements = {
    id: any;
    original_title: any;

  }
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">ID</label>
              <div className="col-sm-8">
                <input className="form-control" name="id" />
                <span className="text-danger"></span>
              </div>
            </div>
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
                <input className="form-control" name="rating" type="number" />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Release Date</label>
              <div className="col-sm-8">
                <input className="form-control" name="release_date" />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea className="form-control" name="overview" rows={3} />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Image</label>
              <div className="col-sm-8">
                <input className="form-control" name="image" type="file" />
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
