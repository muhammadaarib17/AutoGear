import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

   const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
});

    const addToCart = (product) => {

        setCartItems((previousItems) => {

            const existing = previousItems.find(
                item => item.id === product.id
            );

            if (existing) {

                return previousItems.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );

            }

            return [
                ...previousItems,
                {
                    ...product,
                    quantity: 1
                }
            ];

        });

    };

    const increaseQuantity = (id) => {

        setCartItems(previousItems =>
            previousItems.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );

    };

    const decreaseQuantity = (id) => {

        setCartItems(previousItems =>
            previousItems
                .map(item =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter(item => item.quantity > 0)
        );

    };

    const removeFromCart = (id) => {

        setCartItems(
            cartItems.filter(
                item => item.id !== id
            )
        );

    };
    useEffect(() => {

    localStorage.setItem(
        "cart",
        JSON.stringify(cartItems)
    );

}, [cartItems]);
    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity
            }}
        >

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {

    return useContext(CartContext);

}