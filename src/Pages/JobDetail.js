import { useParams } from "react-router-dom";
import { jobData } from "./jobData";
import Header from "../Components/Header";
import useFetch from "../useFetch";

export default function JobDetail() {
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    `https://intern-house-backend-rho.vercel.app/jobs/${id}`,
    {}
  );

  const jobData = data.job;

  if (loading) {
    return (
      <div>
        <Header />
        <main className="container mt-4 text-center">
          <div className="text-center mt-4">
            <h5>Loading Job Details.....</h5>
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <Header />
        <main className="container mt-4 text-center">
          <p className="text-danger">Error loading job details.</p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container mt-4">
        <h2>{jobData?.jobTitle}</h2>
        <div className="card">
          <div className="card-body">
            <p>
              <strong>Company Name: </strong>
              {jobData?.companyName}
            </p>
            <p>
              <strong>Location: </strong>
              {jobData?.location}
            </p>
            <p>
              <strong>Salary: </strong>
              {jobData?.salary}
            </p>
            <p>
              <strong>Job Type: </strong>
              {jobData?.jobType}
            </p>
            <p>
              <strong>Description: </strong>
              {jobData?.location}
            </p>
            <div>
              <strong>Qualifications: </strong>
              <ol>
                {jobData?.qualifications.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
