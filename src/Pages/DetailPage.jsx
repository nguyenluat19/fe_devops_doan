import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { MdNavigateNext } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { BsCoin } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuCrown } from "react-icons/lu";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbCircleNumber5Filled,
} from "react-icons/tb";
import { GoShieldCheck } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import { BsBox } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import Spinner from "../components/Spinner";
import { IoChevronDownSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import ScrollToTop from "./SliderHome/ScrollTop";
import CommentSection from "./AllComment";

const API_URL = import.meta.env.VITE_API;

const DetailPage = () => {
  const { id } = useParams();
  const [cart, setCart, cartActions] = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newProducts, setNewProducts] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    cartActions.addToCart(product);
  };

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API_URL}/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setSelectedImage(response.data.image);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/products/SpMoi`);
        setNewProducts(response.data.latestProducts);
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };
    fetchNewProducts();
  }, []);

  if (!product) return <Spinner />;

  const handleDetail = (id) => {
    if (!id) {
      console.error("Lỗi: ID sản phẩm không hợp lệ!");
      return;
    } else {
      console.log("Detail product with ID:", id);
      navigate(`/detail/${id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const unMainImages = [
    product.image,
    "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/12/13/a16-den-4.png",
    "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/06/24/15-pro-max-spec-5.png",
    "https://cdn.hoanghamobile.com/i/preview-h-V2/Uploads/2024/06/25/oppo-reno12-f-5g-7.png",
  ];

  const handleSubmit = () => {
    if (!product?._id) {
      console.error("Lỗi: ID sản phẩm tra gop không hợp lệ!");
      return;
    }
    navigate(`/tragop/${product._id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExplore = () => {
    toast.error("Hệ thống đang nâng cấp!");
  };

  const addToCart = () => {
    const newProduct = {
      ...product,
      _id: product._id,
      quantity: 1,
    };
    cartActions.addToCart(newProduct);
    toast.success("Thêm sản phẩm thành công!");
  };

  const gioHang = () => {
    const newProduct = {
      ...product,
      _id: product._id,
      quantity: 1,
    };
    cartActions.addToCart(newProduct);
    navigate("/cart");
  };

  const hanldeMuaNgay = () => {
    gioHang(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout title={"chi tiet"}>
      <div className="w-full max-w-[1200px] mx-auto bg-[#F4F4F4] px-4 sm:px-6 lg:px-8">
        <div className="mt-[110px] space-y-4">
          <p className="flex items-center text-xs sm:text-sm">
            <GoHome className="text-base sm:text-lg" />
            <span className="ml-1">Trang chủ</span>
            <MdNavigateNext className="mx-1" />
            <span>Chi tiết</span>
            <MdNavigateNext className="mx-1" />
            <strong className="text-xs sm:text-sm">
              Sản phẩm {product.name}
            </strong>
          </p>
          <h4 className="font-bold text-lg sm:text-xl lg:text-2xl">
            {product.name}
          </h4>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-2.5 items-start">
            <div className="w-full lg:w-[53%]">
              <div className="w-full shadow-[0_4px_10px_rgba(129,129,129,0.1)] border border-[#E6E1E1] rounded-lg">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="max-w-full w-full sm:w-[80%] lg:w-[400px] mx-auto aspect-square object-contain"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mt-3.5">
                {unMainImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="w-12 h-12 sm:w-[60px] sm:h-[60px] object-cover rounded-md cursor-pointer bg-white transition-transform duration-200 ease-in-out shadow-[0_5px_10px_rgba(0,0,0,0.1)] hover:scale-110 hover:border-2 hover:border-[#2e5986]"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
              <div className="bg-white mt-3.5 rounded-lg border border-[#E6E1E1] p-3 sm:p-4 text-xs sm:text-sm leading-loose">
                <div className="flex items-center">
                  <BsBox className="text-lg sm:text-xl text-[#2e5986] mr-2" />{" "}
                  Miễn phí vận chuyển toàn quốc
                </div>
                <div className="flex items-center">
                  <GoShieldCheck className="text-lg sm:text-xl text-[#2e5986] mr-2" />{" "}
                  Bảo hành 13 tháng
                </div>
                <div className="flex items-center">
                  <FaRegStar className="text-lg sm:text-xl text-[#2e5986] mr-2" />{" "}
                  Lỗi 1 đổi 1 trong vòng 30 ngày
                </div>
                <div className="flex items-center">
                  <MdAddChart className="text-lg sm:text-xl text-[#2e5986] mr-2" />{" "}
                  Giá đã bao gồm VAT
                </div>
              </div>
              <div className="w-full bg-white mt-3 rounded-lg font-['-apple-system','BlinkMacSystemFont','Inter',sans-serif] text-xs sm:text-sm">
                <div className="flex items-center font-bold rounded-t-lg p-3 sm:p-4 text-[#333333] bg-[#EBEBEB]">
                  <HiOutlineClipboardDocumentList className="text-xl sm:text-2xl text-[#333333] mr-2" />{" "}
                  THÔNG TIN SẢN PHẨM
                </div>
                <div className="p-3 sm:p-4">
                  <div className="bg-[#EBEBEB] rounded-lg p-3 sm:p-4">
                    <h6 className="font-bold text-[#333333] text-sm sm:text-base">
                      Nội dung chính
                    </h6>
                    <div className="mb-0.5 space-y-1">
                      <div>
                        Thông số kỹ thuật của điện thoại {product.name}{" "}
                        (4+4GB/64GB)
                      </div>
                      <div>Đánh giá điện thoại {product.name}:</div>
                      <div> - Thiết kế: Comming soon</div>
                      <div> - Màn hình: Comming soon</div>
                      <div> - Chip xử lý: Comming soon</div>
                      <div> - Dung lượng pin: Comming soon</div>
                      <div> - Camera của {product.name}: Comming soon</div>
                      <div>Điện thoại {product.description}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-white mt-3.5 rounded-lg font-['-apple-system','BlinkMacSystemFont','Inter',sans-serif] text-xs sm:text-sm mb-5">
                <div className="flex items-center font-bold rounded-t-lg p-3 sm:p-4 text-[#333333] bg-[#EBEBEB]">
                  <IoSettingsOutline className="text-xl sm:text-2xl text-[#333333] mr-2" />{" "}
                  THÔNG SỐ KỸ THUẬT
                </div>
                <div className="p-3 sm:p-4">
                  <div className="bg-[#EBEBEB] rounded-lg p-3 sm:p-4 space-y-1">
                    <div className="p-[6px_10px]">
                      <strong>Tần số quét (Hz):</strong> Sắp ra mắt
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Kích thước màn hình:</strong> Sắp ra mắt
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Công nghệ màn hình:</strong> Sắp ra mắt
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Độ phân giải:</strong> Sắp ra mắt
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Độ sáng màn hình:</strong> Sắp ra mắt
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Kiểu màn hình:</strong> Sắp ra mắt
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Độ phân giải camera:</strong> Sắp ra mắt
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Tính năng camera:</strong> Sắp ra mắt
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Camera trước:</strong> Sắp ra mắt
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Camera sau:</strong> Sắp ra mắt
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Đèn Flash:</strong> Có
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Vi xử lý:</strong> Sắp ra mắt
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Tốc độ CPU:</strong> Sắp ra mắt
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Xử lý đồ họa (GPU):</strong> Sắp ra mắt
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Bộ nhớ trong:</strong> Sắp ra mắt
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Thẻ nhớ ngoài:</strong> Sắp ra mắt
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Số khe SIM:</strong> 2 Nano SIM
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Cảm biến:</strong> Sắp ra mắt
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Bluetooth:</strong> Sắp ra mắt
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Cổng kết nối/sạc:</strong> Sắp ra mắt
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Jack tai nghe:</strong> Type-C
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Kết Nối NFC:</strong> Có
                    </div>
                    <div className="p-[6px_10px]">
                      <strong>Kháng nước, kháng bụi:</strong> IP68
                    </div>
                    <div className="bg-white p-[10px] rounded-md">
                      <strong>Bảo mật sinh trắc học:</strong> Mở khoá khuôn mặt
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[47%] lg:sticky lg:top-[86px] lg:max-h-[90vh] lg:overflow-y-auto rounded-lg pb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <p>
                    Giá:{" "}
                    <strong className="text-[#FD475A] font-bold text-lg sm:text-xl">
                      {product.price.toLocaleString()}đ
                    </strong>
                  </p>
                  <p className="line-through text-xs sm:text-sm font-normal mt-1">
                    {product.priceGoc.toLocaleString()}đ
                  </p>
                </div>
                <div className="text-xs sm:text-sm">
                  <p>
                    SKU: <strong>KM1312LC</strong>
                  </p>
                </div>
              </div>
              <div className="cursor-pointer mt-4">
                <p className="font-bold text-sm">Lựa chọn màu</p>
                <div className="flex items-center w-full max-w-[180px] sm:max-w-[200px] border border-[#2e5986] rounded-lg p-2 relative">
                  <img
                    src={product.image}
                    className="w-10 h-10 sm:w-[50px] sm:h-[50px] object-cover"
                  />
                  <div className="flex-grow ml-2 leading-6">
                    <p className="m-0.5 font-bold text-xs sm:text-sm">
                      Màu undefined
                    </p>
                    <p className="m-0.5 text-[#FD475A] text-xs">
                      {product.price.toLocaleString()}đ
                    </p>
                    <div className="absolute right-2 bottom-2 bg-[#2e5986] text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                      <FaCheck />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full border border-[#2e5986] mt-2.5 rounded-md bg-gradient-to-b from-[#ccdff4] to-white">
                <div className="flex flex-col sm:flex-row p-2 sm:p-[5px_10px] gap-4">
                  <div className="flex-1">
                    <span className="text-[#6d6b6b] text-xs sm:text-sm">
                      Dành riêng cho mualike.io.vn member
                    </span>
                    <div className="text-lg sm:text-xl font-bold text-[#2e5986]">
                      {(product.price * 0.8).toLocaleString()}đ
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#757575] text-xs sm:text-sm line-through mr-2.5">
                        {product.price.toLocaleString()}đ
                      </span>
                      <span className="font-bold text-base sm:text-[17px] text-[#FD475A]">
                        -20%
                      </span>
                    </div>
                    <div className="mt-2.5">
                      <p className="bg-[#FFF7D8] text-[#FBB31E] font-bold text-xs sm:text-sm w-[160px] sm:w-[180px] rounded-[30px] p-1 border border-[#FCD34D] flex items-center">
                        <BsCoin className="inline mr-1" /> +25,000 điểm thưởng
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[#757575] text-xs sm:text-sm">
                      Ưu đãi trả góp (*)
                    </div>
                    <span className="text-lg sm:text-xl font-bold text-[#2e5986]">
                      517,917đ/tháng
                    </span>
                    <p className="text-[#757575] text-xs sm:text-sm">
                      (Kỳ hạn 6th/trả trước 50%)
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full mt-2.5">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                  <button
                    className="rounded-lg border-none w-full sm:w-3/4 text-white bg-[#FD475A] p-2 sm:p-[5px] text-sm sm:text-base"
                    onClick={() => hanldeMuaNgay()}
                  >
                    <strong>MUA NGAY</strong>
                    <div className="text-xs sm:text-sm">
                      (Giao tận nhà hoặc nhận tại cửa hàng)
                    </div>
                  </button>
                  <button
                    className="w-full sm:w-1/4 pb-1 sm:pb-[5px] rounded-lg border border-[#FD475A] text-[#FD475A] flex flex-col items-center justify-center"
                    onClick={addToCart}
                  >
                    <strong className="text-lg sm:text-xl">
                      <AiOutlineShoppingCart />
                    </strong>
                    <div className="text-xs sm:text-sm">Thêm giỏ hàng</div>
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 mt-2.5">
                  <button
                    className="flex-1 rounded-lg border-none text-white bg-[#2e5986] p-2 sm:p-3 text-sm sm:text-base"
                    onClick={() => handleSubmit()}
                  >
                    <strong>Trả góp 0%</strong>
                    <div className="text-xs sm:text-sm mb-1">
                      0 phí - 0 trả trước
                    </div>
                  </button>
                  <button
                    className="flex-1 rounded-lg border-none text-white bg-[#2e5986] p-2 sm:p-3 text-sm sm:text-base"
                    onClick={() => handleSubmit()}
                  >
                    <strong>Trả góp qua thẻ</strong>
                    <div className="text-xs sm:text-sm mb-1">
                      (Visa, Mastercard, JCB)
                    </div>
                  </button>
                </div>
              </div>
              <div className="w-full bg-white mt-3.5 rounded-lg">
                <div>
                  <h3 className="p-2 sm:p-[8px_10px] text-sm sm:text-base font-bold bg-[#FFDADE] text-[#FD475A] rounded-t-lg">
                    <LuCrown className="text-lg sm:text-xl inline mr-1" /> ƯU
                    ĐÃI mualike.io.vn
                  </h3>
                </div>
                <div className="text-xs sm:text-sm p-2 sm:p-[5px_10px] mb-1 leading-7 sm:leading-8">
                  <div className="flex items-center">
                    <TbCircleNumber1Filled className="text-xl sm:text-[25px] text-[#FD475A] mr-2" />
                    Tích thêm 8,000 cho các hạng thành viên{" "}
                    <strong
                      className="cursor-pointer text-[#2e5986]"
                      onClick={() => handleExplore()}
                    >
                      (Khám phá ngay)
                    </strong>
                  </div>
                  <div className="flex items-center">
                    <TbCircleNumber2Filled className="text-xl sm:text-[25px] text-[#FD475A] mr-2" />
                    Giảm thêm tới 25,000 cho Hoàng Hà Members{" "}
                    <strong
                      className="cursor-pointer text-[#2e5986]"
                      onClick={() => handleExplore()}
                    >
                      (Khám phá ngay)
                    </strong>
                  </div>
                  <div className="flex items-center">
                    <TbCircleNumber3Filled className="text-xl sm:text-[25px] text-[#FD475A] mr-2" />
                    Ưu đãi trả góp 0% qua Shinhan Finance{" "}
                    <strong
                      className="cursor-pointer text-[#2e5986]"
                      onClick={() => handleExplore()}
                    >
                      (Xem chi tiết)
                    </strong>
                  </div>
                  <div className="flex items-center">
                    <TbCircleNumber4Filled className="text-xl sm:text-[25px] text-[#FD475A] mr-2" />
                    Mở thẻ HSBC - Hoàn tiền tới 2 triệu đồng{" "}
                    <strong
                      className="cursor-pointer text-[#2e5986]"
                      onClick={() => handleExplore()}
                    >
                      (Xem chi tiết)
                    </strong>
                  </div>
                  <div className="flex items-center">
                    <TbCircleNumber5Filled className="text-xl sm:text-[25px] text-[#FD475A] mr-2" />
                    Giảm đến 150.000đ khi thanh toán qua Muadee{" "}
                    <strong
                      className="cursor-pointer text-[#2e5986]"
                      onClick={() => handleExplore()}
                    >
                      (Xem chi tiết)
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full max-w-[1200px] bg-white p-3 sm:p-4 rounded-lg mb-5">
            <div className="text-black mt-1 font-bold text-lg sm:text-xl">
              SẢN PHẨM MỚI
            </div>
            <div
              data-aos="zoom-out"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 mt-2.5"
            >
              {Array.isArray(newProducts) &&
                newProducts.map((product, index) => (
                  <div
                    key={index}
                    className="border border-[#ECE9E9] bg-white rounded-md p-3 sm:p-[12.8px] text-center"
                  >
                    <div onClick={() => handleDetail(product._id)}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[150px] sm:h-[200px] object-cover rounded-lg cursor-pointer"
                      />
                    </div>
                    <h6
                      onClick={() => handleDetail(product._id)}
                      className="font-semibold text-xs sm:text-[13px] text-[#4b4b4b] cursor-pointer mt-2"
                    >
                      {product.name}
                    </h6>
                    <div className="flex justify-around items-center mt-1">
                      <div className="text-[#FD475A] font-bold text-sm sm:text-[15px]">
                        {product.price.toLocaleString()}đ
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 line-through mt-[-5px]">
                        {product.priceGoc.toLocaleString()}đ
                      </div>
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#4b4b4b] mt-1">
                      {product.description.substring(0, 27)}...
                    </p>
                    <div onClick={() => handleDetail(product._id)}>
                      <p className="text-xs sm:text-[13px] text-[#FC521D] cursor-pointer font-bold mt-1 flex items-center justify-center">
                        <IoChevronDownSharp className="inline mr-1" /> Các ưu
                        đãi khác
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <CommentSection />
        <ScrollToTop />
      </div>
    </Layout>
  );
};

export default DetailPage;
