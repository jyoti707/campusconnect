import collegeImg from "../assets/college.png";

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to CampusConnect</h1>

        <p>
          Your one-stop portal for campus activities,
          announcements, events and student engagement.
        </p>

        <img
          src={collegeImg}
          alt="College Campus"
          className="college-img"
        />

        <div className="btn-container">
  <button className="btn">Explore Now</button>
</div>
      </section>

      <section className="announcements">
        <div className="card">📢 Hackathon Registration Open</div>
        <div className="card">🎓 Placement Drive Next Week</div>
        <div className="card">☁️ Cloud Workshop on Friday</div>
      </section>
    </>
  );
}

export default Home;