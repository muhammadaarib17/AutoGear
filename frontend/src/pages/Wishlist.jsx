import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {

  const { wishlistItems } = useWishlist();

  return (

    <div className="container">

      <h1 className="section-title">
        ❤️ My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (

        <div className="empty-message">

          <h2>Your wishlist is empty.</h2>

          <p>
            Click the ❤️ button on any product to save it here.
          </p>

        </div>

      ) : (

        <div className="products-grid">

          {wishlistItems.map((product) => (

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

export default Wishlist;