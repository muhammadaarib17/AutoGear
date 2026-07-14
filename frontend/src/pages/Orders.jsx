import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    API.get("orders/")
      .then((response) => {

        setOrders(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (

    <div className="container">

      <h1 className="section-title">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <h3 style={{ textAlign: "center", color: "white" }}>
          No Orders Found
        </h3>

      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            className="order-card"
          >

            <h2>📦 Order #{order.id}</h2>

            <p>
              <strong>👤 Name:</strong> {order.full_name}
            </p>

            <p>
              <strong>📞 Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>📍 Address:</strong> {order.address}, {order.city}
            </p>

            <hr />

            <h3>Products Purchased</h3>

            {order.items.map((item) => (

              <div
                key={item.id}
                className="order-item"
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="order-product-image"
                />

                <div>

                  <h4>{item.product.name}</h4>

                  <p>
                    Brand: {item.product.brand}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Price: Rs. {item.price}
                  </p>

                </div>

              </div>

            ))}

            <hr />

            <h3>
              💰 Total: Rs. {order.total_price}
            </h3>

            <p>
              <strong>📅 Ordered On:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>

          </div>

        ))

      )}

    </div>

  );

}

export default Orders;