import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    jobDescription: "",
  });
  const [jobList, setJobList] = useState([]);

  const loadJobs = () => {
    axios.get("/api/jobs").then((res) => setJobList(res.data)).catch(() => {});
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/jobs", formData)
      .then(() => {
        alert("Job saved!");
        setFormData({
          jobTitle: "",
          companyName: "",
          location: "",
          salary: "",
          jobType: "",
          jobDescription: "",
        });
        loadJobs();
      })
      .catch(() => {
        alert("Error saving job");
      });
  };

  return (
    <div className="container">
      <div>
        <h2>Add Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Job Title</label>
            <input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Company Name</label>
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Salary</label>
            <input name="salary" value={formData.salary} onChange={handleChange} />
          </div>

          <div>
            <label>Job Type</label>
            <select name="jobType" value={formData.jobType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <label>Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        <h3 style={{ marginTop: "30px" }}>Saved Jobs</h3>
        <button type="button" onClick={loadJobs} style={{ marginBottom: "15px" }}>
          Refresh list
        </button>
        {jobList.length === 0 ? (
          <p>No jobs yet. Add one above.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {jobList.map((job) => (
              <li key={job.id} style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px", borderRadius: "5px" }}>
                <strong>{job.job_title}</strong> at {job.company_name}
                <br />
                {job.location}
                {job.salary ? ` • ${job.salary}` : ""}
                {job.job_type ? ` • ${job.job_type}` : ""}
                {job.job_description ? <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#555" }}>{job.job_description}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
