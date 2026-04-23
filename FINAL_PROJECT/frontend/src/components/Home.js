function Home() {
  const trends = [
  "Web Development Internship",
  "Data Science Internship",
  "Python Training",
  "UI/UX Design Course"
];
  return (
    <>
      <div className="main">
        <div className="left">
          <h1>India's <span>#1 platform</span></h1>
          <p>For fresher jobs, internships and courses</p>

          <div className="signup-box">
            <button className="google">Continue with Google</button>
            <button className="email">Continue with Email</button>
          </div>

          <p className="terms">By continuing, you agree to our T&C.</p>
        </div>

        <div className="right">
          <img src="https://via.placeholder.com/350" alt="Students" />
        </div>
      </div>

      <div className="companies">
        <p><b>10K+</b> Openings daily</p>
        <p>Paytm | Nestle | HCL | BookMyShow | Nykaa</p>
      </div>

      <div className="trending">
        <h2>Trending now</h2>

        <div className="trend-items">
            {trends.map((item, index) => (
    <div className="trend-box" key={index}>
      {item}
    </div>
  ))}
</div>
      </div>
    </>
  );
}

export default Home;