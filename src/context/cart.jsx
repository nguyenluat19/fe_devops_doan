
import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext();
// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart từ localStorage khi khởi tạo
    useEffect(() => {
        let existingCartItem = localStorage.getItem('cart');
        if (existingCartItem) setCart(JSON.parse(existingCartItem))
    }, [])

    // Hàm lưu cart vào localStorage
    const saveToLocalStorage = (cartData) => {
        localStorage.setItem('cart', JSON.stringify(cartData));
    };

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = (newProduct) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex(item => item._id === newProduct._id);
            let updatedCart;
            
            if (productIndex !== -1) {
                // Sản phẩm đã tồn tại, cập nhật số lượng
                updatedCart = [...prevCart];
                updatedCart[productIndex].quantity += newProduct.quantity || 1;
            } else {
                // Sản phẩm chưa tồn tại, thêm sản phẩm mới
                updatedCart = [...prevCart, { ...newProduct, quantity: newProduct.quantity || 1 }];
            }
            
            saveToLocalStorage(updatedCart);
            return updatedCart;
        });
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(item => item._id !== productId);
            saveToLocalStorage(updatedCart);
            return updatedCart;
        });
    };

    // Cập nhật số lượng sản phẩm
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        setCart((prevCart) => {
            const updatedCart = prevCart.map(item => 
                item._id === productId 
                    ? { ...item, quantity: newQuantity }
                    : item
            );
            saveToLocalStorage(updatedCart);
            return updatedCart;
        });
    };

    // Xóa toàn bộ giỏ hàng
    const clearCart = () => {
        setCart([]);
        saveToLocalStorage([]);
    };

    // Tính tổng số lượng sản phẩm
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Tính tổng tiền
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Kiểm tra sản phẩm có trong giỏ hàng không
    const isInCart = (productId) => {
        return cart.some(item => item._id === productId);
    };

    const cartActions = {
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isInCart
    };

    return (
        <CartContext.Provider value={[cart, setCart, cartActions]}>
            {children}
        </CartContext.Provider>
    );
};

// custom hook
const useCart = () => useContext(CartContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useCart, CartProvider };