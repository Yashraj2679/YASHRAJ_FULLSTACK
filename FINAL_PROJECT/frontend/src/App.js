import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function App() {

  const [internships, setInternships] = useState([]);
  const [applied, setApplied] = useState({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const internshipRef = useRef(null);
  const coursesRef = useRef(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [user, setUser] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );

  const fileInputRef = useRef(null);

  // 🔥 My Applications
  const [showApplications, setShowApplications] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/internships");
      setInternships(res.data);
    } catch {
      console.log("Backend not running");
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:8080/applications");
      setApplications(res.data);
      setShowApplications(true);
    } catch {
      alert("Error fetching applications");
    }
  };

  const scrollToInternships = () => {
    internshipRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCourses = () => {
    coursesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/login", {
        username,
        password
      });

      if (res.data.includes("Login Successful")) {
        setUser(username);
        setShowLogin(false);
        alert("Login successful!");
      } else {
        alert(res.data);
      }
    } catch {
      alert("Backend not connected!");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:8080/register", {
        username,
        password
      });

      alert(res.data);

      if (res.data.includes("Registered")) {
        setShowRegister(false);
      }
    } catch {
      alert("Backend not connected!");
    }
  };

  const handleLogout = () => {
    setUser("");
    alert("Logged out!");
  };

  const applyNow = async (title) => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/apply", {
        internship: title
      });

      alert(res.data);
      setApplied({ ...applied, [title]: true });
    } catch {
      alert("Apply failed!");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  let filteredInternships = internships.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.company.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "stipend") {
    filteredInternships.sort((a, b) =>
      parseInt(b.stipend.replace(/[^0-9]/g, "")) -
      parseInt(a.stipend.replace(/[^0-9]/g, ""))
    );
  }

  if (sort === "latest") {
    filteredInternships.reverse();
  }

  return (
    <div className={darkMode ? "dark" : ""}>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">Intern<span>shala</span></div>

        <div className="menu">
          <a href="#" onClick={(e) => {e.preventDefault(); scrollToInternships();}}>Internships</a>
          <a href="#" onClick={(e) => {e.preventDefault(); scrollToCourses();}}>Courses</a>
          <a href="#" onClick={(e) => {e.preventDefault(); fetchApplications();}}>My Applications</a>

          {!user ? (
            <>
              <a href="#" onClick={(e) => {e.preventDefault(); setShowLogin(true);}}>Login</a>
              <a href="#" className="btn register" onClick={(e) => {e.preventDefault(); setShowRegister(true);}}>Register</a>
            </>
          ) : (
            <div className="user-section">
              <span>Hi, {user}</span>
              <a href="#" onClick={(e) => {e.preventDefault(); handleLogout();}}>Logout</a>
            </div>
          )}
        </div>
      </div>

      {/* HERO */}
      <div className="main">
        <div className="left">
          <h1>Get the <span>right internship</span></h1>
          <p>Find your dream internship with ease</p>
        </div>

        <div className="right">
          <img
            src={image}
            alt="internship"
            style={{ width: "250px", cursor: "pointer" }}
            onClick={handleImageClick}
          />
          <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange}/>
        </div>
      </div>

      {/* INTERNSHIPS */}
      <div className="internships" ref={internshipRef}>
        <h2>Latest Internships</h2>

        <input
          type="text"
          placeholder="🔍 Search internships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        {filteredInternships.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.title}</h3>
            <p><b>{item.company}</b></p>
            <p>📍 {item.location}</p>
            <p>💰 {item.stipend}</p>

            <button className="apply-btn" onClick={() => applyNow(item.title)}>
              {applied[item.title] ? "Applied" : "Apply Now"}
            </button>
          </div>
        ))}
      </div>
        <div className="courses" ref={coursesRef}>
  <h2>Popular Courses</h2>

  <div className="course-list">
    <div className="course-card">💻 Web Development</div>
    <div className="course-card">🤖 Machine Learning</div>
    <div className="course-card">🎨 UI/UX Design</div>
    <div className="course-card">📈 Digital Marketing</div>
  </div>
</div>
      {/* MY APPLICATIONS */}
      {showApplications && (
        <div className="internships">
          <h2>My Applications</h2>

          {applications.length === 0 ? (
            <p>No applications yet</p>
          ) : (
            applications.map((app, index) => (
              <div className="card" key={index}>
                <h3>{app.internship}</h3>
                <p>Applied by: {app.username}</p>
              </div>
            ))
          )}
        </div>
      )}
      {showLogin && (
  <div className="overlay">
    <div className="popup">
      <h3>Login</h3>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setShowLogin(false)}>Close</button>
    </div>
  </div>
)}
    {showRegister && (
  <div className="overlay">
    <div className="popup">
      <h3>Register</h3>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => setShowRegister(false)}>Close</button>
    </div>
  </div>
)}
    </div>
  );
}

export default App;