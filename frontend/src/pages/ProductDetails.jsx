import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

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
      <h2 style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div className="product-details">

      <div className="details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="details-info">

        <h1>{product.name}</h1>

        <p>
          <strong>Brand:</strong> {product.brand}
        </p>

        <p>
          <strong>Compatible Car:</strong> {product.compatible_car}
        </p>

        <p>{product.description}</p>

        <div className="details-price">

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

        <button className="buy-btn">
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;