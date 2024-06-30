import React from 'react';
import './Home.css';
import budgetImage from '../budget copy.jpg'; // Import the image

const Home = () => (
  <div className="container">
    <header>
      <h1>Home Budget Planner</h1>
    </header>
    <main className="main-content">
      <h2>Welcome to the Home Budget Planner</h2>
      <p>Manage your expenses, income, and view your dashboard.</p>
      <img src={budgetImage} alt="Budget" className="budget-image" /> {/* Add the image */}
    </main>
    <footer>
      <p>© 2023 Home Budget Planner</p>
    </footer>
  </div>
);

export default Home;
