import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderContext = createContext();

const API_URL = import.meta.env.VITE_API;

// eslint-disable-next-line react/prop-types
const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    // Tạo đơn hàng mới
    const createOrder = async (orderData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/v3/orders`, orderData);
            toast.success("Đơn hàng đã được tạo thành công!");
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng:", error);
            toast.error(error.response?.data?.message || "Lỗi khi tạo đơn hàng");
            return { success: false, error: error.response?.data?.message };
        } finally {
            setLoading(false);
        }
    };

    // Lấy tất cả đơn hàng của user hiện tại
    const getUserOrders = useCallback(async (userId) => {
        if (!userId) {
            return { success: false, error: "User ID không hợp lệ" };
        }

        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/v3/getOrderByUserId/${userId}`);
            setOrders(response.data || []);
            return { success: true, data: response.data };
        } catch (error) {
            if (error.response?.status === 404) {
                setOrders([]);
                return { success: true, data: [] };
            }
            toast.error("Lỗi khi lấy danh sách đơn hàng");
            return { success: false, error: error.response?.data?.message };
        } finally {
            setLoading(false);
        }
    }, []);

    // Lấy chi tiết đơn hàng theo ID
    const getOrderById = async (orderId) => {
        if (!orderId) {
            return { success: false, error: "Order ID không hợp lệ" };
        }

        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/v3/orders/${orderId}`);
            setCurrentOrder(response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
            toast.error("Không tìm thấy đơn hàng");
            return { success: false, error: error.response?.data?.message };
        } finally {
            setLoading(false);
        }
    };

    // Lấy tất cả đơn hàng (cho admin)
    const getAllOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/v3/getAllOrder`);
            setOrders(response.data || []);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Lỗi khi lấy tất cả đơn hàng:", error);
            toast.error("Lỗi khi lấy danh sách đơn hàng");
            return { success: false, error: error.response?.data?.message };
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật trạng thái đơn hàng (cho admin)
    const updateOrderStatus = async (orderId, status) => {
        if (!orderId || !status) {
            return { success: false, error: "Thông tin không hợp lệ" };
        }

        setLoading(true);
        try {
            const response = await axios.put(`${API_URL}/api/v3/orders/${orderId}/status`, { status });
            
            // Cập nhật order trong state
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order._id === orderId 
                        ? { ...order, status: status }
                        : order
                )
            );

            if (currentOrder && currentOrder._id === orderId) {
                setCurrentOrder(prev => ({ ...prev, status: status }));
            }

            toast.success("Cập nhật trạng thái đơn hàng thành công");
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
            toast.error("Lỗi khi cập nhật trạng thái đơn hàng");
            return { success: false, error: error.response?.data?.message };
        } finally {
            setLoading(false);
        }
    };

    // Xóa đơn hàng (cho admin)
    const deleteOrder = async (orderId) => {
        if (!orderId) {
            return { success: false, error: "Order ID không hợp lệ" };
        }

        setLoading(true);
        try {
            await axios.delete(`${API_URL}/api/v3/delete/order/${orderId}`);
            
            // Xóa order khỏi state
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            
            if (currentOrder && currentOrder._id === orderId) {
                setCurrentOrder(null);
            }

            toast.success("Xóa đơn hàng thành công");
            return { success: true };
        } catch (error) {
            console.error("Lỗi khi xóa đơn hàng:", error);
            toast.error("Lỗi khi xóa đơn hàng");
            return { success: false, error: error.response?.data?.message };
        } finally {
            setLoading(false);
        }
    };

    // Clear orders (khi logout)
    const clearOrders = () => {
        setOrders([]);
        setCurrentOrder(null);
    };

    // Các utility functions
    const getOrdersByStatus = (status) => {
        return orders.filter(order => order.status === status);
    };

    const getTotalOrdersCount = () => {
        return orders.length;
    };

    const getTotalOrdersValue = () => {
        return orders.reduce((total, order) => total + (order.totalPrice || 0), 0);
    };

    const orderActions = {
        createOrder,
        getUserOrders,
        getOrderById,
        getAllOrders,
        updateOrderStatus,
        deleteOrder,
        clearOrders,
        getOrdersByStatus,
        getTotalOrdersCount,
        getTotalOrdersValue
    };

    return (
        <OrderContext.Provider value={[
            orders, 
            setOrders, 
            {
                ...orderActions,
                loading,
                currentOrder,
                setCurrentOrder
            }
        ]}>
            {children}
        </OrderContext.Provider>
    );
};

// Custom hook
const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider");
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useOrder, OrderProvider };
