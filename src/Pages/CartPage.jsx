import Layout from "../components/Layout/Layout";
import { MdNavigateNext } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { useCart } from "../context/cart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Image } from "antd";
import toast from "react-hot-toast";
import React from "react";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart, cartActions] = useCart();
  const navigate = useNavigate();

  const mergedCart = React.useMemo(() => {
    const map = new Map();
    cart.forEach((item) => {
      const key = item._id;
      if (!map.has(key)) {
        map.set(key, { ...item });
      } else {
        const exist = map.get(key);
        exist.quantity += item.quantity;
        map.set(key, exist);
      }
    });
    return Array.from(map.values());
  }, [cart]);

  const totalPrice = () => {
    if (!mergedCart.length) return "0 VND";
    const total = cartActions.getTotalPrice();
    return total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const totalQuantity = cartActions.getTotalItems();

  const removeCartItem = (pid) => {
    try {
      cartActions.removeFromCart(pid);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleVoucher = () => {
    toast.error("Chức năng đang được phát triển 🚀");
  };

  const handleCheckout = () => {
    if (auth?.token) {
      navigate("/thanh-toan", { state: { cart } });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/login", { state: "/cart" });
    }
  };

  const handleLogin = () => {
    navigate("/login", { state: "/cart" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout title={"Giỏ hàng"}>
      <div className="w-full max-w-[1200px] mt-[110px] mx-auto px-4 sm:px-6 lg:px-8 font-['Inter']">
        <div className="mt-10 mb-5 space-y-4">
          <p className="flex items-center text-sm sm:text-base">
            <GoHome className="text-base sm:text-lg mr-1" />
            <span>Trang chủ</span>
            <MdNavigateNext className="mx-1" />
            <span>Giỏ hàng</span>
          </p>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center text-center py-8 sm:py-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Giỏ hàng trống
              </h2>
              <img
                src="https://cdn.tgdd.vn/mwgcart/v2/vue-pro/img/empty-cart.9cc0f897feb1585aec6c0902e.png"
                alt="Giỏ hàng trống"
                className="w-full max-w-[520px] mb-4 sm:mb-6"
              />
              <Link
                to="/"
                className="inline-block px-6 py-2.5 bg-[#2e5986] text-white rounded-md hover:bg-[#1e3c5e] transition-colors duration-300 text-sm sm:text-base"
              >
                Quay về trang chủ
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-[15px]">
              {/* Left Section - Cart Items */}
              <div className="w-full lg:w-[65%] bg-white rounded-lg p-4 sm:p-6 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center bg-[#f8f8f8] rounded-xl p-3 sm:p-4 transition-all duration-300 hover:bg-[#f5f5f5]"
                  >
                    <div className="w-full sm:w-[90px] h-[70px] sm:h-[90px] flex items-center justify-center rounded-lg overflow-hidden bg-white border-2 border-gray-200 p-1 mb-3 sm:mb-0">
                      <Image
                        src={item?.image || "/placeholder.png"}
                        alt={item?.name || "Không có tên sản phẩm"}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-grow ml-0 sm:ml-4 w-full sm:flex-1 space-y-2 text-sm sm:text-base text-[#333]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                        <h4 className="font-semibold text-sm sm:text-base text-[#333] truncate">
                          {item?.name ? item.name.substring(0, 15) : "Sản phẩm"}
                        </h4>
                        <button
                          className="ml-auto sm:ml-0 text-[#FD475A] hover:text-red-600 transition-colors duration-300 flex items-center text-sm"
                          onClick={() => removeCartItem(item._id)}
                        >
                          <RiDeleteBin6Line className="mr-1" /> Xóa
                        </button>
                      </div>

                      <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                        <div>Màu: undefined</div>
                        <div className="truncate">
                          {item?.description
                            ? item.description.substring(0, 25) + "..."
                            : "Không có mô tả"}
                        </div>
                        <div>Số lượng: {item?.quantity || 0}</div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:gap-4">
                        <div className="text-[#FD475A] font-bold text-sm sm:text-base">
                          {(
                            item?.price * (item.quantity || 1)
                          ).toLocaleString()}
                          đ
                        </div>
                        <div className="line-through text-xs sm:text-sm text-gray-500">
                          {item?.priceGoc
                            ? item.priceGoc.toLocaleString()
                            : "0"}
                          đ
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Section - Order Summary */}
              <div className="w-full lg:w-[35%] lg:sticky lg:top-[88px] bg-white rounded-lg p-4 sm:p-6 h-auto lg:h-[59vh] flex flex-col gap-2">
                <h4 className="text-lg sm:text-xl font-semibold text-[#333] text-center p-2">
                  Tổng giỏ hàng
                </h4>

                <div className="text-center text-xs sm:text-sm text-gray-600">
                  Total | Checkout | Payment
                </div>

                {/* Voucher Input */}
                <div className="flex flex-wrap w-full">
                  <input
                    type="text"
                    placeholder="Nhập mã ưu đãi"
                    className="flex-1 min-w-[150px] mt-2 px-3 py-2 border border-gray-200 rounded-l-md outline-none text-sm"
                  />
                  <button
                    onClick={handleVoucher}
                    className="w-full sm:w-auto mt-2 py-2 px-3 bg-[#2e5986] text-white rounded-md sm:rounded-l-none hover:bg-[#1e3c5e] transition-colors duration-300 text-sm"
                  >
                    Áp dụng
                  </button>
                </div>

                {/* Total Summary */}
                <div className="space-y-2 flex-grow">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-xs sm:text-sm text-[#4B4B4B]">
                      Tổng sản phẩm:
                    </span>
                    <span>{totalQuantity} SP</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-xs sm:text-sm text-[#4B4B4B]">
                      Tổng tiền:
                    </span>
                    <span className="text-sm sm:text-base">{totalPrice()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-xs sm:text-sm text-[#4B4B4B]">
                      Tổng khuyến mãi:
                    </span>
                    <span>200.000đ</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-xs sm:text-sm text-[#4B4B4B]">
                      Áp dụng Voucher:
                    </span>
                    <span>0đ</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs sm:text-sm text-[#4B4B4B]">
                      Cần thanh toán:
                    </span>
                    <span className="text-[#FD475A] font-semibold text-sm sm:text-base">
                      {(
                        parseInt(totalPrice().replace(/[^\d]/g, ""), 10) -
                        200000
                      ).toLocaleString("vi-VN")}
                      đ
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                {auth?.token ? (
                  <button
                    className="w-full py-3 bg-[#2e5986] text-white rounded-md hover:bg-[#1e3c5e] transition-colors duration-300 text-sm sm:text-base font-medium"
                    onClick={handleCheckout}
                  >
                    Xác nhận đơn
                  </button>
                ) : (
                  <button
                    className="w-full py-3 bg-[#2e5986] text-white rounded-md hover:bg-[#1e3c5e] transition-colors duration-300 text-sm sm:text-base font-medium"
                    onClick={handleLogin}
                  >
                    Vui lòng đăng nhập
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
