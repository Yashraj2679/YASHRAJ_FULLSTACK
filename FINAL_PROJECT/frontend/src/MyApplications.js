import React, { useEffect, useState } from "react";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/applications")
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        applications.map((app, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px",
            borderRadius: "8px"
          }}>
            <h3>{app.internship}</h3>
            <p>Applied by: {app.username}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;