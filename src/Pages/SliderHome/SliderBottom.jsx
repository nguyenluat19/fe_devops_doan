import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderBottom = () => {
  const slideBottomItem = [
    {
      name: "Nguyễn Hữu Luật",
      role: "Software engineer",
      image:
        "https://itguru.vn/blog/wp-content/uploads/2018/07/ky-su-phan-mem.jpg",
      detail:
        "Từ sau cơ hội hợp tác với mualike.io.vn là mình có thêm địa chỉ để mua sắm đồ công nghệ rất hợp lý ở cả Đà Nẵng và Thừa Thiên Huế quê mình.",
    },
    {
      name: "Nguyễn Hữu Luật",
      role: "service management",
      image:
        "https://static.topcv.vn/cms/ky-su-phan-mem-topcv%20(2)642a7fee0d6f9.jpg",
      detail:
        " mualike.io.vn là thương hiệu yêu thích của mình, luôn tin tưởng ghé qua mua hàng mỗi dịp iPhone ra sản phẩm mới.",
    },
    {
      name: "Nguyễn Hữu Luật",
      role: "Graphics engineer",
      image:
        "https://static-images.vnncdn.net/files/publish/2023/4/25/ky-su-cntt-2-139.jpg",
      detail:
        "Mình biết tới  mualike.io.vn nhờ 1 vài anh em trong nghề giới thiệu, từ đó là tốn kha khá 'máu' đầu tư cho đồ công nghệ mới",
    },
    {
      name: "Nguyễn Hữu Luật",
      role: "Hardware engineer",
      image:
        "https://icdn.24h.com.vn/upload/2-2024/images/2024-04-01/Sot-AI-Ky-su-phan-mem-AI-co-luong-len-toi-1-trieu-USD-2-1711944702-892-width1085height615.png",
      detail:
        "Cảm ơn  mualike.io.vn đã cho “Mợ” cơ hội là một trong những khách hàng đầu tiên sở hữu cực phẩm S25 Ultra của Samsung. “Cậu” Bình An ở nhà chắc cũng đang mê lắm đấy!",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <strong className="text-lg font-semibold block mb-4">
        Khách hàng của TranChinh Store
      </strong>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {slideBottomItem.map((items, index) => (
          <SwiperSlide key={index}>
            <div className="border rounded-lg p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <img
                className="w-full sm:w-1/3 h-40 object-cover rounded"
                src={items.image}
                alt="Product"
              />
              <div className="flex-1">
                <h5 className="text-lg font-semibold">{items.name}</h5>
                <p className="text-blue-600">{items.role}</p>
                <p className="text-gray-600">{items.detail}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderBottom;
