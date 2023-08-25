import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header className="header-container">
      <h1 className="header-title">Redux Blog</h1>
      <nav className="nav-container">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="post" className="nav-link">
              Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
