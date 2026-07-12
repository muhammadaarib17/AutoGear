import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

    const [wishlistItems, setWishlistItems] = useState(() => {

        const savedWishlist = localStorage.getItem("wishlist");

        return savedWishlist ? JSON.parse(savedWishlist) : [];

    });

    const addToWishlist = (product) => {

        const exists = wishlistItems.find(
            item => item.id === product.id
        );

        if (exists) return;

        setWishlistItems([
            ...wishlistItems,
            product
        ]);

    };

    const removeFromWishlist = (id) => {

        setWishlistItems(
            wishlistItems.filter(
                item => item.id !== id
            )
        );

    };

    const isInWishlist = (id) => {

        return wishlistItems.some(
            item => item.id === id
        );

    };

    useEffect(() => {

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlistItems)
        );

    }, [wishlistItems]);

    return (

        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                isInWishlist
            }}
        >

            {children}

        </WishlistContext.Provider>

    );

}

export function useWishlist() {

    return useContext(WishlistContext);

}