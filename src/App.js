import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const navigate = useNavigate();

  const { data, loading, error, fetchData } = useFetch(
    "https://intern-house-backend-rho.vercel.app/jobs",
    []
  );

  const filteredJobData =
    jobTitle === ""
      ? data
      : data.filter((job) =>
          job.jobTitle.toLowerCase().includes(jobTitle.toLowerCase())
        );

  function handleDelete(id) {
    fetch(`https://intern-house-backend-rho.vercel.app/jobs/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Failed to delete job");
        }
        return res.json();
      })
      .then(() => {
        toast.success("Job deleted successfully!");
        fetchData();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  }

  if (error) {
    return (
      <div>
        <Header />
        <main className="container mt-4 text-center">
          <p className="text-danger">Error loading jobs.</p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container mt-4">
        <input
          type="text"
          placeholder="Search by job title..."
          className="form-control py-1 mb-2"
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <h2>All Jobs</h2>
        {loading && (
          <div className="text-center mt-4">
            <h5>Loading.....</h5>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="row">
          {filteredJobData.map((job) => (
            <div key={job._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{job.jobTitle}</h5>
                  <p>
                    <strong>Company Name: </strong>
                    {job.companyName}
                  </p>
                  <p>
                    <strong>Location: </strong>
                    {job.location}
                  </p>
                  <p>
                    <strong>Job Type: </strong>
                    {job.jobType}
                  </p>
                  <div className="row g-2">
                    <div className="col">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => navigate(`/jobs/${job._id}`)}
                      >
                        See Details
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
