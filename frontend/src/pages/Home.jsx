import { useEffect, useState } from "react";
import API from "../services/api";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  API.get("products/")
    .then((response) => {
      console.log("SUCCESS:", response);
      console.log("DATA:", response.data);

      setProducts(response.data);
    })
    .catch((error) => {
      console.log("ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);
      }

      if (error.request) {
        console.log("Request:", error.request);
      }
    });
}, []);

  return (
    <>
      <Hero />

      <div className="container">
        <h2 className="section-title">Featured Products</h2>

        {products.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;