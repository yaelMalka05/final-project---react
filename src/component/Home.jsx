import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <h1>Weekly schedule management — simple and clear</h1>
          <p>Save medications by day, update quantities, and easily delete instances. A classic, clean, and user-friendly interface.</p>
          <div className="home-button">
            <Link to="/table"><button className="btn" >Go to Table</button></Link>
            <Link to="/add"><button className="btn secondary" >Add Medication</button></Link>
          </div>
        </div>
        <div>
          <div>
            System Benefits
          </div>
        </div>
      </section>

      <section className="card">
        <h3>What You'll Get</h3>
        <ul>
          <li>Clear interface by week days</li>
          <li>Multiple days or all days addition</li>
          <li>Local or global medication deletion</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;