import { useEffect, useState } from "react";
import axios from "axios";

function Internships() {

  const [internships, setInternships] = useState([]);
  const [applied, setApplied] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8080/internships");
    setInternships(res.data);
  };

  const applyNow = async (title) => {
    await axios.post("http://localhost:8080/apply", {
      name: "Yash",
      internship: title
    });

    setApplied({ ...applied, [title]: true });
    alert("Applied successfully!");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Latest Internships</h2>

      {internships.map((item, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "20px",
            marginTop: "15px",
            borderRadius: "6px",
            border: "1px solid #ddd"
          }}
        >
          <h3>{item.title}</h3>
          <p><b>{item.company}</b></p>
          <p>📍 {item.location}</p>
          <p>💰 {item.stipend}</p>

          <button
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "8px 14px",
              cursor: "pointer"
            }}
            onClick={() => applyNow(item.title)}
          >
            {applied[item.title] ? "Applied" : "Apply Now"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Internships;