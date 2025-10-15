import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { io } from "socket.io-client";
import { useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const QRPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const createdRef = useRef(false);
  const { cart, address, phone } = location.state || {};
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalAmount =
    cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const finalAmount = totalAmount + 1000;

  const createPayment = async (showToast = true) => {
    if (!auth?.user?.id) {
      toast.error("Vui lòng đăng nhập để thanh toán");
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/v5/create-payment`, {
        amount: finalAmount,
        userId: auth.user.id,
        products: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        address,
        phone,
      });

      setQrData(response.data);
      toast.success("Tạo mã QR thành công!");
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Lỗi tạo mã QR thanh toán");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!qrData) return;

    const socket = io(API_URL);

    socket.on("connect", () => {
      console.log("🔌 Connected to socket server");
    });

    socket.on("paymentSuccess", (data) => {
      if (data.paymentId === qrData.paymentId) {
        toast.success("Thanh toán thành công!");
        navigate("/orders");
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [qrData, navigate]);

  useEffect(() => {
    if (!qrData) return;

    const timer = setTimeout(() => {
      toast.error("Thanh toán đã hết hạn, đơn hàng bị hủy!");
      navigate("/orders");
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(timer);
  }, [qrData, navigate]);

  useEffect(() => {
    if (!createdRef.current && cart && cart.length > 0) {
      createPayment();
      createdRef.current = true;
    }
  }, [cart]);

  if (!cart || cart.length === 0) {
    return (
      <Layout title="Thanh toán QR">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center justify-center">
          <p className="text-center text-lg sm:text-xl text-gray-600">
            Không có sản phẩm để thanh toán
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Thanh toán QR">
      <div className="w-full mb-3 mt-[110px] max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2e5986] mb-8">
            Thanh toán bằng QR Code
          </h2>

          {loading && (
            <div className="py-10 text-gray-600">
              <p>Đang tạo mã QR...</p>
            </div>
          )}

          {qrData && (
            <div className="flex flex-col items-center gap-8">
              <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200">
                <img
                  src={qrData.vietQRUrl}
                  alt="QR Code"
                  className="w-full sm:w-[250px] h-auto"
                />
              </div>

              <div className="bg-gray-100 p-6 rounded-xl w-full max-w-[500px] text-left">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#2e5986] mb-5 text-center">
                  Thông tin thanh toán
                </h3>
                <div className="space-y-2">
                  <p className="flex justify-between items-center py-2 border-b border-gray-200 text-sm sm:text-base">
                    <strong className="text-gray-800 sm:min-w-[120px]">Ngân hàng:</strong>
                    <span>{qrData.bankInfo.bank}</span>
                  </p>
                  <p className="flex justify-between items-center py-2 border-b border-gray-200 text-sm sm:text-base">
                    <strong className="text-gray-800 sm:min-w-[120px]">Số tài khoản:</strong>
                    <span>{qrData.bankInfo.account}</span>
                  </p>
                  <p className="flex justify-between items-center py-2 border-b border-gray-200 text-sm sm:text-base">
                    <strong className="text-gray-800 sm:min-w-[120px]">Tên tài khoản:</strong>
                    <span>{qrData.bankInfo.accountName}</span>
                  </p>
                  <p className="flex justify-between items-center py-2 border-b border-gray-200 text-sm sm:text-base">
                    <strong className="text-gray-800 sm:min-w-[120px]">Số tiền:</strong>
                    <span>{qrData.bankInfo.amount.toLocaleString("vi-VN")} VND</span>
                  </p>
                  <p className="flex justify-between items-center py-2 text-sm sm:text-base">
                    <strong className="text-gray-800 sm:min-w-[120px]">Nội dung:</strong>
                    <span>{qrData.bankInfo.content}</span>
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl w-full max-w-[500px] text-left">
                <h4 className="text-lg font-semibold text-[#2e5986] mb-4 text-center">
                  Hướng dẫn thanh toán:
                </h4>
                <ol className="list-decimal pl-5 space-y-3 text-sm sm:text-base">
                  <li>Mở ứng dụng ngân hàng trên điện thoại</li>
                  <li>Chọn chức năng quét QR Code</li>
                  <li>Quét mã QR phía trên</li>
                  <li>Kiểm tra thông tin và xác nhận thanh toán</li>
                  <li>Chờ hệ thống xác nhận thanh toán</li>
                </ol>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mt-8">
            <button
              className="w-full sm:w-auto px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 text-sm sm:text-base font-semibold"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QRPaymentPage;
