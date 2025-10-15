import { GoHome } from "react-icons/go";
import Layout from "../components/Layout/Layout";
import { MdNavigateNext } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { Radio, Modal, Spin } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CBDatHang = () => {
  const location = useLocation();
  const cart = location.state?.cart ?? [];
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [valueName, setValueName] = useState(auth.user.name);
  const [valueAddress, setValueAddress] = useState(auth.user.address);
  const [valuePhone, setValuePhone] = useState(auth.user.phone);
  const [radio, setRadio] = useState("online");
  const [qrVisible, setQrVisible] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [orderId, setOrderId] = useState("");
  const [paid, setPaid] = useState(false);

  const totalPriceNumber = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalPrice = totalPriceNumber.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const totalQuantity = cart.reduce((t, i) => t + i.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    navigate("/qr-payment", {
      state: {
        cart,
        address: valueAddress,
        phone: valuePhone,
      },
    });
  };

  const pollPayment = (paymentId) => {
    const interval = setInterval(async () => {
      try {
        const check = await axios.get(
          `${API_URL}/api/payment/check-payment?id=${paymentId}`
        );
        if (check.data.status === "confirmed") {
          clearInterval(interval);
          setPaid(true);
          toast.success("Thanh toán thành công!");
        }
      } catch (e) {
        console.error("Check payment error:", e);
      }
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        name: valueName,
        address: valueAddress,
        phone: valuePhone,
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: totalPrice,
      };

      const res = await axios.post("/api/orders", orderData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      toast.success("Đặt hàng thành công!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi đặt hàng");
    }
  };

  return (
    <Layout title="Thông tin đặt hàng">
      <div className="w-full max-w-[1200px] mt-[110px] mx-auto px-4 sm:px-6 lg:px-8 font-inter mb-5 space-y-4">
        <p className="flex items-center text-sm sm:text-base">
          <GoHome className="text-base sm:text-lg mr-1" />
          <span>Trang chủ</span>
          <MdNavigateNext className="mx-1" />
          <span>Thông tin</span>
        </p>

        {cart.length > 0 ? (
          <div className="flex flex-col gap-4">
            {/* Product List */}
            <div className="w-full bg-white rounded-lg p-4 sm:p-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 rounded-xl p-3 sm:p-4 border-b border-gray-300 transition-all duration-300 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-[90px] h-[70px] sm:h-[90px] flex items-center justify-center rounded-lg overflow-hidden bg-white border-2 border-gray-200 p-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className="text-sm sm:text-base font-semibold text-gray-700">
                        Sản phẩm: {item.name ? item.name.substring(0, 15) : "Sản phẩm"}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Màu: undefined</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2 sm:mt-0">
                    <div className="text-xs sm:text-sm text-gray-600">Số lượng: {item.quantity}</div>
                    <div className="text-red-500 font-bold text-sm sm:text-base">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Information */}
            <div className="w-full bg-white rounded-lg p-4 sm:p-6 space-y-4">
              <h6 className="text-lg sm:text-xl font-semibold text-gray-800">THÔNG TIN NHẬN HÀNG</h6>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-600">
                    Địa chỉ giao hàng
                  </label>
                  <input
                    type="text"
                    value={valueAddress}
                    onChange={(e) => setValueAddress(e.target.value)}
                    placeholder="Số nhà, đường, quận, thành phố"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-600">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={valuePhone}
                    onChange={(e) => setValuePhone(e.target.value)}
                    placeholder="09xxxxxxxx"
                    pattern="[0-9]{9,11}"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="flex justify-between items-center py-2">
                  <strong className="text-sm sm:text-base text-gray-700">
                    Tổng tiền tạm tính ({totalQuantity} sp)
                  </strong>
                  <div className="text-sm sm:text-base text-gray-800">{totalPrice}</div>
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="w-full bg-white rounded-lg p-4 sm:p-6 space-y-4">
              <h6 className="text-lg sm:text-xl font-semibold text-gray-800">PHƯƠNG THỨC THANH TOÁN</h6>
              <div className="flex flex-col gap-4">
                <Radio.Group
                  onChange={(e) => setRadio(e.target.value)}
                  value={radio}
                  className="flex flex-col gap-2"
                >
                  <Radio value="online" className="text-sm sm:text-base"> 
                    Thanh toán online (QR)
                  </Radio>
                </Radio.Group>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#2e5986] text-white rounded-md hover:bg-[#1e3c5e] transition-colors duration-300 text-sm sm:text-base font-medium"
                >
                  Thanh toán
                </button>
              </div>
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
              className="inline-block px-6 py-2.5 bg-[#2e5986] text-white rounded-md hover:bg-[#1e3c5e] transition-colors duration-300 text-sm sm:text-base"
            >
              Quay về trang chủ
            </a>
          </div>
        )}
      </div>

      {/* QR Payment Modal */}
      <Modal
        open={qrVisible}
        footer={null}
        onCancel={() => setQrVisible(false)}
        centered
      >
        {paid ? (
          <h3 className="text-green-600 text-center">✅ Đơn hàng đã xác nhận!</h3>
        ) : qrUrl ? (
          <div className="text-center">
            <h4 className="text-lg font-semibold">Quét QR để thanh toán</h4>
            <img src={qrUrl} alt="QR Code" className="w-[250px] mx-auto" />
            <p>Mã đơn: {orderId}</p>
          </div>
        ) : (
          <Spin className="flex justify-center" />
        )}
      </Modal>
    </Layout>
  );
};

export default CBDatHang;
