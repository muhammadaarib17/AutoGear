import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaCar,
  FaHeart,
  FaBoxOpen,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

function Navbar() {
  const { cartItems } = useCart();

  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("access");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    navigate("/");
    window.location.reload();
  };

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/products?search=${search}`);
            }
          }}
        />
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/cart" className="icon-link">
          <FaShoppingCart />

          <span className="cart-count">
            {cartItems.reduce(
              (total, item) => total + item.quantity,
              0
            )}
          </span>
        </Link>

        {!isLoggedIn ? (

          <Link to="/login" className="account-area">

            <FaUser className="account-icon" />

            <div className="account-info">

              <span className="account-name">
                Hello, Guest
              </span>

              <span className="login-text">
                Login
              </span>

            </div>

          </Link>

        ) : (

          <div className="account-dropdown">

            <div className="account-area">

              <FaUser className="account-icon" />

              <div className="account-info">

                <span className="account-name">
                  Hello, {username}
                </span>

                <span className="login-text">
                  Account <FaChevronDown />
                </span>

              </div>

            </div>

            <div className="dropdown-menu">

                <Link to="/profile">
                  <FaUser />
                  My Profile
                </Link>

                <Link to="/orders">
                  <FaBoxOpen />
                  My Orders
                </Link>

                <Link to="/wishlist">
                  <FaHeart />
                  Wishlist
                </Link>

                <button onClick={handleLogout}>
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;