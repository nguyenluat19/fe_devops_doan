import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { MdNavigateNext } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { Image } from "antd";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CThanhToanPage = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const navigate = useNavigate();

  const totalPrice = () => {
    if (!cart || cart.length === 0) return "0 VND";
    try {
      let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return total.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    } catch (error) {
      console.error("Error calculating total price:", error);
      return "0 VND";
    }
  };

  const handleVoucher = () => {
    toast.error("Chức năng đang được phát triển 🚀");
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleDatHang = () => {
    Swal.fire({
      title: "Xác nhận đặt hàng",
      text: `Bạn có chắc chắn muốn đặt ${totalQuantity} sản phẩm này không?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2e5986",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, đặt hàng!",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cbDatHang", { state: { cart } });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("Người dùng đã hủy đặt hàng.");
        Swal.fire({
          title: "Đã hủy",
          text: "Đơn hàng của bạn đã được hủy bỏ.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <Layout title="Thanh Toán">
      <div className="w-full max-w-[1200px] mt-[110px] mx-auto px-4 sm:px-6 lg:px-8 font-inter mb-5 space-y-4">
        <p className="flex items-center text-sm sm:text-base">
          <GoHome className="text-base sm:text-lg mr-1" />
          <span>Trang chủ</span>
          <MdNavigateNext className="mx-1" />
          <span>Đặt hàng</span>
        </p>
        {cart.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
            <div className="w-full lg:w-2/3 bg-white rounded-lg p-4 sm:p-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-50 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:bg-gray-100"
                >
                  <div className="w-full sm:w-[90px] h-[70px] sm:h-[90px] flex items-center justify-center rounded-lg overflow-hidden bg-white border-2 border-gray-200 p-1 mb-3 sm:mb-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      preview={false}
                    />
                  </div>
                  <div className="flex-grow ml-0 sm:ml-4 w-full sm:flex-1 space-y-2 text-sm sm:text-base text-gray-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                      <h4 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                        {item.name ? item.name.substring(0, 15) : "Sản phẩm"}
                      </h4>
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                      <div>Màu: undefined</div>
                      <div>Số lượng: {item.quantity}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:gap-4">
                      <div className="text-red-500 font-bold text-sm sm:text-base">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </div>
                      <div className="line-through text-xs sm:text-sm text-gray-500">
                        {item.priceGoc.toLocaleString()}đ
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-[35%] lg:sticky lg:top-24 bg-white rounded-lg p-4 sm:p-6 h-auto lg:h-[59vh] flex flex-col gap-2">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 text-center p-2">
                Tổng giỏ hàng
              </h4>
              <div className="text-center text-xs sm:text-sm text-gray-600">
                Total | Checkout | Payment
              </div>
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
              <div className="space-y-2 flex-grow">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Tổng sản phẩm:
                  </span>
                  <span>{totalQuantity} SP</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Tổng tiền:
                  </span>
                  <span className="text-sm sm:text-base">{totalPrice()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Tổng khuyến mãi:
                  </span>
                  <span>200.000đ</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Voucher:
                  </span>
                  <span>0đ</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Cần thanh toán:
                  </span>
                  <span className="text-red-500 font-semibold text-sm sm:text-base">
                    {(parseInt(totalPrice().replace(/[^\d]/g, ""), 10) - 200000).toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>
              <button
                className="w-full py-3 bg-[#2e5986] text-white rounded-md hover:bg-[#1e3c5e] transition-colors duration-300 text-sm sm:text-base font-medium"
                onClick={handleDatHang}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-8 sm:py-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Không có sản phẩm trong giỏ hàng
            </h2>
            <img
              src="https://cdn.tgdd.vn/mwgcart/v2/vue-pro/img/empty-cart.9cc0f897feb1585aec6c0902e.png"
              alt="Giỏ hàng trống"
              className="w-full max-w-[520px] mb-4 sm:mb-6"
            />
            <a
              href="/"
              className="inline-block px-6 py-2.5 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors duration-300 text-sm sm:text-base"
            >
              Quay về trang chủ
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CThanhToanPage;