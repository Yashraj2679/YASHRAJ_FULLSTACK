function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">Intern<span>shala</span></div>

      <div className="menu">
        <a href="#">Internships</a>
        <a href="#">Courses</a>
        <a href="#" className="btn">Login</a>
        <a href="#" className="btn register">Register</a>
      </div>
    </div>
  );
}

export default Navbar;