import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <header>
        <h1>Safe Space for Domestic Violence Victims</h1>
        <p>
          A secure platform for women facing domestic violence to seek help and resources.
        </p>
        <nav>
          <Link to="/report">Submit a Report</Link>
          <Link to="/resources">Find Resources</Link>
          <Link to="/dao">View DAO</Link>
        </nav>
      </header>
    </div>
  );
};

export default Home;
