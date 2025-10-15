import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API;

const SliderFlash = () => {
  const [products, setProducts] = useState([]);
  const [countdown, setCountdown] = useState(4500);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/products`);
        setProducts(res.data);
      } catch (error) {
        console.log("Lỗi khi lấy danh sách sản phẩm flash:", error);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBuyNow = (id) => {
    if (!id) {
      console.error("Lỗi: ID sản phẩm không hợp lệ!");
      return;
    }
    navigate(`/detail/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-lg font-semibold">Đang diễn ra</h5>
        <p className="text-sm text-gray-600">
          Kết thúc trong: {formatTime(countdown)}
        </p>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div
              className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
              onClick={() => handleBuyNow(product._id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h6 className="text-sm font-semibold text-gray-700">
                {product.name}
              </h6>
              <p className="text-lg font-bold text-red-600">
                {product.price.toLocaleString()}đ
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500 line-through">
                  {product.priceGoc.toLocaleString()}đ
                </p>
                <p className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  -{product.discount}%
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderFlash;