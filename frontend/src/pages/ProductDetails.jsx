import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    API.get(`products/${id}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!product) {
    return (
      <h2 className="loading">
        Loading...
      </h2>
    );
  }

  const discount = Math.round(
    ((product.original_price - product.sale_price) /
      product.original_price) *
      100
  );

  return (
    <div className="details-container">

      <div className="details-image">

        <div className="discount-badge">
          {discount}% OFF
        </div>

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      <div className="details-info">

        <h1>{product.name}</h1>

        <h3>{product.brand}</h3>

        <p className="compatible">
          Compatible with:
          <strong> {product.compatible_car}</strong>
        </p>

        <div className="details-price">

          <span className="old-price">
            Rs. {product.original_price}
          </span>

          <span className="new-price">
            Rs. {product.sale_price}
          </span>

        </div>

        <p className="stock">
          {product.stock > 0
            ? "✅ In Stock"
            : "❌ Out of Stock"}
        </p>

        <p className="description">
  {product.description.length > 120
    ? product.description.substring(0, 120) + "..."
    : product.description}
</p>

        <div className="quantity-box">

          <button
            onClick={() =>
              quantity > 1 &&
              setQuantity(quantity - 1)
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>

        <div className="details-buttons">

          <button
    className="cart-btn"
    onClick={() => addToCart(product)}
>
          Add to Cart
          </button>

          <button className="buy-btn">
            Buy Now
          </button>

        </div>

        <div className="extra-info">

          <p>🚚 Delivery within 2–5 working days</p>

          <p>🔄 7 Days Replacement Warranty</p>

          <p>💳 Cash on Delivery Available</p>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;