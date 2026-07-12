import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function ProductCard({ product }) {

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const liked = isInWishlist(product.id);

  const toggleWishlist = () => {

    if (liked) {

      removeFromWishlist(product.id);

    } else {

      addToWishlist(product);

    }

  };

  const discount = Math.round(
    ((product.original_price - product.sale_price) /
      product.original_price) *
      100
  );

  return (

    <div className="product-card">

      <button
        className={`wishlist-btn ${liked ? "liked" : ""}`}
        onClick={toggleWishlist}
      >
        <FaHeart />
      </button>

      <div className="discount-badge">
        {discount}% OFF
      </div>

      <img
        src={product.image}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p className="brand">
        <strong>Brand:</strong> {product.brand}
      </p>

      <p className="car">
        <strong>Compatible:</strong> {product.compatible_car}
      </p>

      <div className="price">

        <span className="old-price">
          Rs. {product.original_price}
        </span>

        <span className="new-price">
          Rs. {product.sale_price}
        </span>

      </div>

      <p className="stock">
        {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
      </p>

      <div className="buttons">

        <Link to={`/product/${product.id}`}>
          <button className="details-btn">
            View Details
          </button>
        </Link>

        <button
          className="cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

      </div>

    </div>

  );

}

export default ProductCard;