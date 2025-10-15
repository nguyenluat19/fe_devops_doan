import { useEffect, useState } from "react";
import axios from "axios";
import "./SliderHome/styleChungIcon.css";
import Layout from "../components/Layout/Layout";
import { Radio } from "antd";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SliderHome from "./SliderHome/SliderHome";
import { Prices } from "../components/Prices";
import ScrollToTop from "./SliderHome/ScrollTop";
import { MdOutlineFilterAlt } from "react-icons/md";
import SliderFlash from "./SliderHome/SliderFlash";
import SliderBottom from "./SliderHome/SliderBottom";
import { useNavigate } from "react-router-dom";
import { IoChevronDownSharp } from "react-icons/io5";
import Notification from "../Notification";

const API_URL = import.meta.env.VITE_API;

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [radio, setRadio] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.log("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    if (!radio || radio.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        const price = parseFloat(product.price);
        return price >= radio[0] && price <= radio[1];
      });
      setFilteredProducts(filtered);
    }
  }, [radio, products]);

  const handleBuyNow = (id) => {
    if (!id) {
      console.error("Lỗi: ID sản phẩm không hợp lệ!");
      return;
    }
    navigate(`/detail/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout title={"Trang chủ"}>
      <div className="w-full mt-[110px]">
        <SliderHome />
        <Notification />

        {/* Container: đổi sang cột ở mobile, hàng ở md+ */}
        <div className="flex flex-col xl:flex-row mx-auto items-start justify-center w-full lg:w-[1200px]  min-h-screen gap-2 font-['Inter']">
          {/* Sidebar bộ lọc: hiện ở mobile và nằm TRÊN main; sticky chỉ áp dụng từ md+ */}
          <div className="order-1 md:order-none w-full xl:w-[230px] xl:sticky mt-2.5 md:top-[85px] h-fit bg-white p-3 rounded-xl self-start mb-5">
            <h5 className="flex items-center text-lg font-semibold text-gray-800 mb-2.5">
              <MdOutlineFilterAlt className="mr-2 text-orange-500 text-xl" />
              Lọc theo giá SP
            </h5>
            <hr className="mb-3" />
            <div className="flex flex-col gap-3">
              <Radio.Group
                className="flex flex-col gap-2"
                onChange={(e) => setRadio(e.target.value)}
              >
                {Prices.map((p) => (
                  <div
                    key={p._id}
                    className="bg-gray-50 p-2 pl-3 rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-2 hover:bg-gray-100 hover:translate-x-1"
                  >
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
              <button
                className="mt-2.5 bg-[#2e5986] text-white border-none px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-[#333454] w-full"
                onClick={() => window.location.reload()}
              >
                Tải lại
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="order-2 md:order-none w-full xl:w-[960px] bg-white mt-2.5 rounded-xl md:flex-1">
            <div className="p-2.5">
              {/* Flash Sale */}
              <div className="bg-white w-full rounded-xl">
                <SliderFlash />
              </div>

              {/* Products Section */}
              <div className="block w-full">
                {/* Videos */}
                <div className="w-full flex gap-3 flex-col xl:flex-row justify-center">
                  <video
                    className="w-full rounded-md"
                    controls
                    muted
                    autoPlay
                    loop
                  >
                    <source
                      src="https://cdn.hoanghamobile.com/FetchVideo?src=/Uploads/2024/12/11/infinix-note-40-pro-w.mp4"
                      type="video/mp4"
                    />
                    Trình duyệt không hỗ trợ video.
                  </video>
                  <video
                    className="w-full rounded-md"
                    controls
                    muted
                    autoPlay
                    loop
                  >
                    <source
                      src="https://cdn.hoanghamobile.com/FetchVideo?src=/Uploads/2025/02/10/spart-go-1-w-1_638748033500238042.mp4"
                      type="video/mp4"
                    />
                    Trình duyệt không hỗ trợ video.
                  </video>
                </div>

                <p className="text-gray-800 mt-5 font-bold">Dành cho bạn</p>

                {/* Product List */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product._id}
                        className="relative border border-gray-200 bg-white rounded-md p-3 text-center cursor-pointer hover:shadow-lg transition-shadow"
                      >
                        <p
                          className={`absolute text-xs p-0.5 px-2 rounded-md font-medium top-2 left-2 ${
                            product.discount > 10
                              ? "text-red-500 bg-red-100 border border-red-300"
                              : "text-[#2e5986] bg-white border border-[#2e5986]"
                          }`}
                        >
                          Giảm {product.discount}%
                        </p>

                        <div
                          onClick={() => handleBuyNow(product._id)}
                          className="cursor-pointer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[200px] object-cover rounded-lg cursor-pointer"
                          />
                        </div>

                        <h6
                          onClick={() => handleBuyNow(product._id)}
                          className="font-semibold text-xs text-gray-800 cursor-pointer"
                          style={{
                            fontWeight: "600",
                            fontSize: "13px",
                            color: "#4b4b4b",
                          }}
                        >
                          {product.name}
                        </h6>

                        <div className="flex justify-around items-center mt-2">
                          <p className="text-red-500 font-bold text-sm">
                            {product.price.toLocaleString()}đ
                          </p>
                          <p
                            className="text-xs text-gray-500 leading-tight"
                            style={{ marginTop: "-1.25px" }}
                          >
                            {product.priceGoc.toLocaleString()}đ
                          </p>
                        </div>

                        <p
                          className="text-xs text-gray-800 mt-1"
                          style={{ fontSize: "13px" }}
                        >
                          {product.description.substring(0, 27)}...
                        </p>

                        <div className="flex items-center gap-2 text-xs text-gray-700 mt-2">
                          <p className="bg-[#FFDFD4] px-2 py-0.5 rounded-md font-bold text-[#FC521D]">
                            KM
                          </p>
                          <p>Nhiều gói ưu đãi</p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-700 mt-1">
                          <p className="bg-[#FFDFD4] px-2 py-0.5 rounded-md font-bold text-[#FC521D]">
                            KM
                          </p>
                          <p>Trả góp 0% - 0 phí - 0 trả</p>
                        </div>

                        <div
                          onClick={() => handleBuyNow(product._id)}
                          className="cursor-pointer"
                        >
                          <p
                            className="text-xs text-[#FC521D] font-bold flex items-center justify-center"
                            style={{
                              fontSize: "13px",
                            }}
                          >
                            <IoChevronDownSharp className="mr-1" /> Các ưu đãi
                            khác
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p
                      className="text-center mx-auto pb-5 w-full"
                      style={{
                        textAlign: "center",
                        margin: "auto",
                        paddingBottom: "20px",
                      }}
                    >
                      Rất tiếc 😢! <br /> Không có sản phẩm nào phù hợp
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SliderBottom />
        <ScrollToTop />
      </div>
    </Layout>
  );
};

export default HomePage;
