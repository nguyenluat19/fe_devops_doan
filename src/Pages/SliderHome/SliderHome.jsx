import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const SliderHome = () => {
  const sliderList = [
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2025/02/07/1200x375.png",
    },
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/09/promotion-kv-redmi-note-14-series.png",
    },
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/09/s24-web.png",
    },
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/12/28/redmagic-10-pro-desktop-1.png",
    },
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/10/honor-x5b-1200x375.jpg",
    },
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/07/tuf-hoang-ha-1200x375.jpg",
    },
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2024/12/26/tecno-30c-w-2490.png",
    },
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/06/redmi-buds-6-pro-01.jpg",
    },
  ];

  const sliderList2 = [
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/11/note14.png",
    },
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2025/02/07/sanphamhot2-a06.png",
    },
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/11/honor200.png",
    },
    {
      image:
        "https://cdn.hoanghamobile.com/i/home/Uploads/2025/02/08/mac-4.png",
    },
  ];

  return (
    <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 ">
      {/* Giữ nguyên phần danh mục nhưng đang comment */}

      <div className="w-full">
        <div className="space-y-4 sm:space-y-6">
          {/* WRAPPER có tỉ lệ khung hình responsive để banner luôn chuẩn, không bị nhảy layout */}
          <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
            {/* Trên mobile dùng 16:9, lên desktop chuyển gần với 1200x375 (~3.2:1). Full-bleed (tràn toàn màn) */}
            <div className="aspect-[16/9] md:aspect-[21/9] lg:aspect-[1200/375] overflow-hidden rounded-none sm:rounded-xl">
              <Swiper
                spaceBetween={12}
                centeredSlides
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation
                // Tối ưu khoảng cách theo breakpoint
                breakpoints={{
                  0: { spaceBetween: 8 },
                  640: { spaceBetween: 12 },
                  768: { spaceBetween: 16 },
                  1024: { spaceBetween: 24 },
                  1280: { spaceBetween: 30 },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full"
              >
                {sliderList.map((item, index) => (
                  <SwiperSlide key={index} className="h-full">
                    <img
                      className="h-full w-full object-cover select-none"
                      src={item.image}
                      alt={`Slider ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Lưới 4 ảnh nhỏ bên dưới: giữ tỉ lệ thống nhất, không méo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {sliderList2.map((item, index) => (
              <div key={index} className="overflow-hidden rounded-xl">
                <div className="aspect-[16/9] sm:aspect-[5/3]">
                  <img
                    className="h-full w-full object-cover"
                    src={item.image}
                    alt={`Slider Item ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderHome;
