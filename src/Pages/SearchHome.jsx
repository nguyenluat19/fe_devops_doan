import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import { GoHome } from 'react-icons/go';
import { MdNavigateNext, MdOutlineFilterAlt } from 'react-icons/md';
import { Radio } from 'antd';
import { Prices } from '../components/Prices';
import { IoArrowBackOutline } from "react-icons/io5";
import { GrLinkNext } from "react-icons/gr";
import Spinner from '../components/Spinner';

const API_URL = import.meta.env.VITE_API;

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get('keyword');
  const [radio, setRadio] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/search?keyword=${keyword}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        setProducts([]);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

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

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout title="Tìm kiếm">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mt-[110px] space-y-4">
          <p className="flex items-center text-xs sm:text-sm">
            <GoHome className="text-base sm:text-lg" />
            <span className="ml-1">Trang chủ</span>
            <MdNavigateNext className="mx-1" />
            <span>Tìm kiếm</span>
          </p>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-lg sm:text-2xl mt-20 sm:mt-24 lg:mt-[120px] mb-20 sm:mb-40 lg:mb-[290px] text-[#FD475A]">
              Không tìm thấy sản phẩm nào phù hợp 😢
            </p>
          ) : (
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-[15px]">
              <div className="w-full lg:w-[230px] lg:sticky lg:top-[90px] lg:self-start bg-white p-3 sm:p-4 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1)] mb-5">
                <h5 className="flex items-center text-base sm:text-lg font-semibold text-[#333] mb-2">
                  <MdOutlineFilterAlt className="text-xl sm:text-[22px] text-[#ff5722] mr-2" /> Lọc theo giá SP
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
                        className="bg-[#f9f9f9] p-2 sm:p-[10px_15px] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#f6f5f5] hover:translate-x-[5px] flex items-center gap-1.5 cursor-pointer"
                      >
                        <Radio value={p.array} className="text-sm sm:text-base font-medium text-[#333]">
                          {p.name}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                  <button
                    className="mt-2 bg-[#2e5986] text-white border-none py-2 px-3 rounded-md hover:bg-[#333454] transition-colors duration-300 text-sm sm:text-base"
                    onClick={() => window.location.reload()}
                  >
                    Reload page
                  </button>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <h4 className="text-base sm:text-lg font-semibold">
                    Kết quả tìm kiếm cho: <strong>{keyword}</strong>
                  </h4>
                  <div
                    className="text-[#2e5986] text-sm sm:text-base cursor-pointer flex items-center gap-1 mt-2 sm:mt-0 sm:mr-4"
                    onClick={() => handleBack()}
                  >
                    <IoArrowBackOutline /> Quay lại trang chủ
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 mb-5">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="border border-[#ECE9E9] bg-white rounded-md p-3 sm:p-[12.8px] text-center relative"
                    >
                      <p className="absolute top-2 left-2 text-xs text-[#2e5986] bg-white border border-[#2e5986] rounded-md px-2 py-0.5">
                        Giảm {product.discount}%
                      </p>
                      <div onClick={() => handleBuyNow(product._id)}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-[150px] sm:h-[200px] object-cover rounded-lg cursor-pointer"
                        />
                      </div>
                      <h6
                        onClick={() => handleBuyNow(product._id)}
                        className="font-semibold text-xs sm:text-[13px] text-[#4b4b4b] cursor-pointer mt-2"
                      >
                        {product.name}
                      </h6>
                      <div className="flex justify-around items-center mt-1">
                        <p className="text-[#FD475A] font-bold text-sm sm:text-[15px]">{product.price.toLocaleString()}đ</p>
                        <p className="text-xs sm:text-sm text-gray-500 line-through mt-[-5px]">{product.priceGoc.toLocaleString()}đ</p>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-[#4b4b4b] mt-1">
                        <p className="bg-[#c6e1ff] text-[#2e5986] font-bold rounded-md px-1.5 py-0.5">KM</p>
                        <p>Nhiều gói ưu đãi</p>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-[#4b4b4b] mt-1">
                        <p className="bg-[#c6e1ff] text-[#2e5986] font-bold rounded-md px-1.5 py-0.5">KM</p>
                        <p>Trả góp 0% - 0 phí - 0 trả</p>
                      </div>
                      <div onClick={() => handleBuyNow(product._id)}>
                        <p className="text-xs sm:text-[13px] text-[#2e5986] cursor-pointer font-bold mt-1 flex items-center justify-center">
                          Xem thêm <GrLinkNext className="ml-1" />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
