import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ProductContext = createContext(null);

const CART_STORAGE_KEY = "cartItems";

// ========================================
// GET INITIAL CART
// ========================================

const getInitialCart = () => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    console.log("Cart from localStorage:", storedCart);

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart;
  } catch (error) {
    console.error(
      "Error reading cart from localStorage:",
      error
    );

    return [];
  }
};

// ========================================
// PRODUCT PROVIDER
// ========================================

const ProductProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    getInitialCart
  );

  const [isCartOpen, setIsCartOpen] = useState(false);

  // ========================================
  // SAVE CART TO LOCALSTORAGE
  // ========================================

  useEffect(() => {
    try {
      console.log(
        "Saving cart to localStorage:",
        cartItems
      );

      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );

      // Check immediately
      console.log(
        "Saved cart:",
        localStorage.getItem(CART_STORAGE_KEY)
      );
    } catch (error) {
      console.error(
        "Error saving cart:",
        error
      );
    }
  }, [cartItems]);

  // ========================================
  // ADD TO CART
  // ========================================

  const addToCart = (product) => {
    console.log("Product received:", product);

    if (!product?._id) {
      console.error(
        "Product _id is missing:",
        product
      );
      return;
    }

    setCartItems((prev) => {
      const existingProduct = prev.find(
        (item) => item.id === product._id
      );

      // Product already exists
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // New product
      const newProduct = {
        id: product._id,
        name: product.name,
        price: product.price,
        image:
          product.images?.[0]?.url ||
          product.imageUrl ||
          product.image ||
          "",
        quantity: 1,
      };

      return [...prev, newProduct];
    });

    setIsCartOpen(true);
  };

  // ========================================
  // REMOVE
  // ========================================

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ========================================
  // UPDATE QUANTITY
  // ========================================

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Number(quantity)
              ),
            }
          : item
      )
    );
  };

  // ========================================
  // CLEAR CART
  // ========================================

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ProductContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// ========================================
// USE CART
// ========================================

export const useCart = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a ProductProvider"
    );
  }

  return context;
};

export default ProductProvider;