import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const discount = Math.round(
    ((product.original_price - product.sale_price) /
      product.original_price) *
      100
  );

  return (
    <div className="product-card">

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

        <button className="cart-btn">
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;