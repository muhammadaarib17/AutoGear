import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    API.get("products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get all categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category.name)),
  ];

  // Search + Category Filter
  const filteredProducts = products.filter((product) => {

    const keyword = search.toLowerCase();

    const matchesSearch =
  product.name.toLowerCase().includes(keyword) ||
  product.brand.toLowerCase().includes(keyword) ||
  product.compatible_car.toLowerCase().includes(keyword) ||
  product.category.name.toLowerCase().includes(keyword);
    const matchesCategory =
      selectedCategory === "All" ||
      product.category.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">

      <h1 className="section-title">
        All Products
      </h1>

      <div className="category-filter">

        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "active-category"
                : ""
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}

      </div>

      {filteredProducts.length === 0 ? (

        <h2 style={{ color: "white", textAlign: "center" }}>
          No Products Found
        </h2>

      ) : (

        <div className="products-grid">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      )}

    </div>
  );
}

export default Products;