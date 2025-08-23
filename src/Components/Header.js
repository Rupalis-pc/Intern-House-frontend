import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-primary">
      <nav className="navbar container navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-bold" to="/">
            Intern House
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Job Postings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/postJob">
                  Post a Job
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
