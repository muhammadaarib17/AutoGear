import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import API from "../services/api";

function Cart() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.sale_price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {

    try {

      await API.post("orders/create/", {

        full_name: fullName,
        phone: phone,
        address: address,
        city: city,

        total_price: total,

        items: cartItems,

      });

      alert("✅ Order Placed Successfully!");

      // Clear Cart
      clearCart();

      // Clear Form
      setFullName("");
      setPhone("");
      setAddress("");
      setCity("");

      // Go to Orders Page
      setTimeout(() => {
        navigate("/orders");
      }, 1000);

    } catch (error) {

      console.log(error);

      alert("❌ Failed to place order.");

    }

  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">

        <h1>🛒 Your Cart is Empty</h1>

        <p>Add some amazing accessories for your car.</p>

        <Link to="/products">
          <button className="continue-btn">
            Continue Shopping
          </button>
        </Link>

      </div>
    );
  }

  return (

    <div className="cart-page">

      <h1>Shopping Cart</h1>

      {cartItems.map(item => (

        <div className="cart-item" key={item.id}>

          <img
            src={item.image}
            alt={item.name}
          />

          <div className="cart-info">

            <h3>{item.name}</h3>

            <p>Rs. {item.sale_price}</p>

            <div className="quantity">

              <button onClick={() => decreaseQuantity(item.id)}>
                -
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => increaseQuantity(item.id)}>
                +
              </button>

            </div>

            <p>
              <strong>Subtotal:</strong>{" "}
              Rs. {(item.sale_price * item.quantity).toFixed(2)}
            </p>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>

          </div>

        </div>

      ))}

      <div className="cart-total">

        <h2>
          Total: Rs. {total.toFixed(2)}
        </h2>

        <div className="checkout-form">

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button
            className="checkout-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>

  );

}

export default Cart;