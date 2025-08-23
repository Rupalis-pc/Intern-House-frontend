import { useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    jobDescription: "",
    qualifications: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const dataToPost = {
      ...formData,
      qualifications: formData.qualifications.split(",").map((q) => q.trim()),
    };

    try {
      const res = await fetch(
        "https://intern-house-backend-rho.vercel.app/jobs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToPost),
        }
      );

      if (!res.ok) console.error("Failed to post job");
      toast.success("Job posted successfully!");

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to post job");
    }
  }

  return (
    <div>
      <Header />
      <main className="container mt-4">
        <h2>Post a Job</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="jobTitle">Job Title: </label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            required
            onChange={handleChange}
          />
          <br />
          <label htmlFor="companyName">Company Name: </label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="salary">Salary: </label>
          <input
            type="number"
            className="form-control"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="jobType">Job Type: </label>
          <select
            className="form-select"
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="">-------Select-------</option>
            {[
              "Full-time (On-site)",
              "Part-time (On-site)",
              "Full-time (Remote)",
              "Part-time (Remote)",
            ].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="jobDescription">Job Description: </label>
          <textarea
            className="form-control"
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            required
          ></textarea>
          <br />
          <label htmlFor="jobQualifications">Job Qualifications: </label>
          <textarea
            className="form-control"
            id="jobQualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            placeholder="Enter qualifications separated by commas...."
            required
          ></textarea>
          <br />
          <button type="submit" className="btn btn-primary">
            Post Job
          </button>
        </form>
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
