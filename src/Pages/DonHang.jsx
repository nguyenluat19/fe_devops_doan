import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { MdNavigateNext } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { Image, Spin } from "antd";
import { useAuth } from "../context/auth";
import { useOrder } from "../context/order";

const DonHang = () => {
  const [auth] = useAuth();
  const [orders, setOrders, { getUserOrders, loading }] = useOrder();

  useEffect(() => {
    const fetchUserOrders = async () => {
      const userId = auth?.user?._id || auth?.user?.id;
      if (!userId) {
        return;
      }

      await getUserOrders(userId);
    };
    
    fetchUserOrders();
  }, [auth?.user?._id, auth?.user?.id, getUserOrders]);

  return (
    <Layout title="Đơn hàng">
      <div className="w-full max-w-6xl mt-[110px] mx-auto px-4 sm:px-6 lg:px-8 font-inter">
        <div className=" mb-5">
          <p className="flex items-center text-sm sm:text-base">
            <GoHome className="text-base sm:text-lg mr-1" />
            <span>Trang chủ</span>
            <MdNavigateNext className="mx-1" />
            <span>Đơn hàng</span>
          </p>

          {loading && (
            <div className="text-center py-5">
              <Spin size="large" />
              <p className="text-gray-600 mt-2">Đang tải đơn hàng...</p>
            </div>
          )}

          {!loading && (!auth?.user || (!auth?.user?._id && !auth?.user?.id)) ? (
            <div className="flex flex-col items-center text-center py-8 sm:py-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Vui lòng đăng nhập để xem đơn hàng
              </h2>
              <img
                src="https://cdn.tgdd.vn/mwgcart/v2/vue-pro/img/empty-cart.9cc0f897feb1585aec6c0902e.png"
                alt="Chưa đăng nhập"
                className="w-full max-w-[520px] mb-4 sm:mb-6"
              />
            </div>
          ) : !loading && orders.length === 0 ? (
            <div className="flex flex-col items-center text-center py-8 sm:py-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Bạn chưa có đơn hàng nào
              </h2>
              <img
                src="https://cdn.tgdd.vn/mwgcart/v2/vue-pro/img/empty-cart.9cc0f897feb1585aec6c0902e.png"
                alt="Không có đơn hàng"
                className="w-full max-w-[520px] mb-4 sm:mb-6"
              />
            </div>
          ) : !loading && (
            <div className="w-full bg-white rounded-xl p-4 sm:p-6 space-y-4">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-50 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:bg-gray-100"
                >
                  <div className="w-full sm:w-[90px] h-[90px] flex items-center justify-center rounded-lg overflow-hidden bg-white border-2 border-gray-200 p-1 mb-3 sm:mb-0">
                    <Image
                      src={order.products?.[0]?.product?.image || "/placeholder.png"}
                      alt={order.products?.[0]?.product?.name || "Sản phẩm"}
                      className="w-full h-full object-contain"
                      preview={false}
                    />
                  </div>
                  <div className="flex-grow ml-0 sm:ml-4 w-full space-y-2 text-sm sm:text-base text-gray-800">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                        Đơn hàng #{order._id?.slice(-8) || "Unknown"}
                      </h4>
                      <div className="text-gray-600">
                        Ngày đặt: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                      <div className="text-gray-600">
                        Tổng tiền: {order.totalPrice?.toLocaleString("vi-VN") || 0}đ
                      </div>
                      <div className="text-gray-600">
                        Trạng thái:{" "}
                        <span
                          className={`${
                            order.status === "Pending"
                              ? "text-orange-500"
                              : order.status === "Completed"
                              ? "text-green-600"
                              : "text-red-500"
                          } font-medium`}
                        >
                          {order.status || "Đang xử lý"}
                        </span>
                      </div>
                      <div className="text-gray-600">Địa chỉ: {order.address || "Không có"}</div>
                      <div className="text-gray-600">
                        Số điện thoại: {order.phone || "Không có"}
                      </div>
                    </div>
                    <div className="mt-2">
                      <strong className="text-gray-800">Sản phẩm:</strong>
                      {order.products?.map((p, i) => (
                        <div key={i} className="ml-3 py-0.5 text-gray-600">
                          • {p.product?.name || "Sản phẩm"} – {p.price?.toLocaleString("vi-VN")}đ ×{" "}
                          {p.quantity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DonHang;
