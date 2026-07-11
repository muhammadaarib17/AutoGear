import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch, FaCar } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <FaCar />
        <span>AutoGear</span>
      </Link>

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search car accessories..."
        />
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/cart" className="icon-link">
          <FaShoppingCart />
          <span className="cart-count">0</span>
        </Link>

        <Link to="/login" className="icon-link">
          <FaUser />
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;