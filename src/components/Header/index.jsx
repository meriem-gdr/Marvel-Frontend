import { Link, useLocation } from "react-router-dom";

import Logo from "../../assets/logo.png";
import "./styles.css";

const Header = ({ search, handleSearchChange, isAuthenticated, logout }) => {
  const location = useLocation();

  return (
    <div className="header-container">
      <header className="header">
        <div className="header-left">
          <img
            src={Logo}
            alt="Marvel Logo"
            width={100}
            height={40}
            className="header-logo"
          />
          {handleSearchChange && (
            <input
              className="header-search"
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
            />
          )}
        </div>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <button className="button-secondary" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" state={{ from: location.pathname }}>
                <button className="button-secondary">Login</button>
              </Link>
              <Link to="/signup" state={{ from: location.pathname }}>
                <button className="button-primary">Signup</button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
