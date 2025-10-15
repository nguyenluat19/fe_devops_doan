import { MdOutlineLocalShipping } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import Layout from "../components/Layout/Layout";
import { GoHome } from "react-icons/go";
import axios from "axios";
import Spinner from "../components/Spinner";
import { FaCheck } from "react-icons/fa6";
import { useAuth } from "../context/auth";
import { MdArrowBackIosNew } from "react-icons/md";
import { useCart } from "../context/cart";

const API_URL = import.meta.env.VITE_API;

const Tragop0 = () => {
  const { id } = useParams();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  if (loading) return <Spinner />;

  const handleBack = () => {
    navigate("/");
  };

  const gioHang = () => {
    let updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex >= 0) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      const newProduct = { ...product, id: product.id || new Date().getTime(), quantity: 1 };
      updatedCart.push(newProduct);
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const hanldeMuaNgay = () => {
    gioHang(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout title="Trả góp 0% lãi suất">
      <div className="w-full max-w-6xl mt-[110px] mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 font-inter">
        <div >
          <div className="mb-4">
            <p className="flex items-center text-sm sm:text-base text-gray-600">
              <GoHome className="text-base sm:text-lg mr-1" />
              <span>Trang chủ</span>
              <MdNavigateNext className="mx-1" />
              <span>Trả góp</span>
              <MdNavigateNext className="mx-1" />
              <strong>{product?.name}</strong>
            </p>
            <h4 className="text-lg sm:text-xl font-bold text-gray-800">
              Trả góp sản phẩm {product?.name} - Chính hãng
            </h4>
          </div>

          {product && (
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h5 className="text-lg font-bold text-gray-800">Thông tin sản phẩm</h5>
                  <div className="mt-3 space-y-2 text-sm sm:text-base text-gray-700">
                    <p>Tên sản phẩm: {product.name}</p>
                    <p>Giá sản phẩm: {product.price.toLocaleString()}đ</p>
                    <p className="text-red-500">Giá gốc: {product.priceGoc.toLocaleString()}đ</p>
                  </div>
                  <div className="mt-4 cursor-pointer">
                    <p className="text-sm font-bold text-gray-800">Lựa chọn màu</p>
                    <div className="flex items-center w-full max-w-[200px] border border-[#2e5986] rounded-lg p-2 mt-2">
                      <img
                        src={product.image}
                        alt="Color"
                        className="w-12 h-12 object-contain"
                      />
                      <div className="flex-grow ml-2">
                        <p className="text-sm font-bold">Màu undefined</p>
                        <p className="text-xs text-red-500">{product.price.toLocaleString()}đ</p>
                        <div className="absolute bottom-2 right-2 bg-[#2e5986] text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                          <FaCheck />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-4 bg-gradient-to-b from-blue-100 to-white border border-[#2e5986] rounded-md p-2 text-sm text-blue-700">
                    <MdOutlineLocalShipping className="text-lg mr-2" />
                    Miễn phí giao hàng cho đơn hàng toàn quốc
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h5 className="text-lg font-bold text-gray-800">1. Thông tin trả góp</h5>
            <div className="bg-white rounded-xl shadow-md mt-2 overflow-hidden">
              <table className="w-full text-sm sm:text-base text-gray-700">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3">Giá sản phẩm</td>
                    <td className="p-3">{product?.price.toLocaleString()}đ</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3">Trả trước</td>
                    <td className="p-3">{(product?.price * 0.3).toLocaleString()}đ (30%)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3">Khoản còn lại</td>
                    <td className="p-3">{(product?.price * 0.7).toLocaleString()}đ (70%)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3">Kỳ hạn</td>
                    <td className="p-3">6 - 12 tháng</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3">Lãi suất</td>
                    <td className="p-3">8%/tháng</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3">Ước tính góp/tháng (6 tháng)</td>
                    <td className="p-3">
                      {((product?.price * 0.7) / 6 + (product?.price * 0.7 * 0.08)).toLocaleString()}đ
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">Giấy tờ cần có</td>
                    <td className="p-3">CCCD + Hộ khẩu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6">
            <h5 className="text-lg font-bold text-gray-800">2. Hướng dẫn trả góp 0%</h5>
            <div className="bg-white rounded-md border border-gray-300 p-3 mt-2 space-y-2 text-sm text-gray-700">
              <p>Bước 1: Chọn sản phẩm bạn muốn mua trả góp</p>
              <p>Bước 2: Điền thông tin cá nhân và chọn hình thức thanh toán</p>
              <p>Bước 3: Nhân viên sẽ liên hệ với bạn để xác nhận đơn hàng</p>
              <p>Bước 4: Nhận hàng và thanh toán theo kỳ hạn đã chọn</p>
            </div>
          </div>

          <div className="mt-6 mb-8">
            <h5 className="text-lg font-bold text-gray-800">3. Thông tin người mua</h5>
            <div className="flex flex-col sm:flex-row gap-4 mt-3">
              <input
                type="text"
                placeholder={auth.user.name}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder={auth.user.phone}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder={auth.user.email}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder={auth.user.address}
              className="w-full p-2 border border-gray-300 rounded-md text-sm mt-4 focus:outline-none focus:ring-2 focus:ring-[#2e5986]"
            />
            <textarea
              name=""
              id=""
              defaultValue="Ghi chú:"
              className="w-full h-24 p-2 border border-gray-300 rounded-md text-sm mt-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2e5986] resize-none"
            />
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                onClick={handleBack}
                className="w-full sm:w-1/3 flex items-center justify-center py-2 bg-[#2e5986] text-white rounded-lg hover:bg-[#2e5986] transition-colors duration-300 text-sm"
              >
                <MdArrowBackIosNew className="mr-2" />
                Quay lại
              </button>
              <button
                onClick={() => hanldeMuaNgay()}
                className="w-full sm:w-1/3 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors duration-300 text-sm"
              >
                Tiếp tục
              </button>
            </div>
            <div className="text-center mt-4 space-y-2 text-sm text-gray-700">
              <p>Lưu ý: Đơn hàng sẽ được giao trong vòng 3-5 ngày làm việc</p>
              <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua số điện thoại: 1900 1234</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tragop0;
