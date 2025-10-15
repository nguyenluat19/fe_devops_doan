// Footer.jsx
// import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer full-bleed text-white" style={{ margin: "auto" }}>
      {/* Lưu ý: để nội dung căn giữa vẫn dùng .container bên trong */}
      <div className="">
        <div className="row">
          {/* Cột 1: Logo & Giới thiệu */}
          <div className="col-12 col-md-3 footer-col">
            <h4 className="fw-bold">Mainshop.com</h4>
            <p>
              Chuyên cung cấp sản phẩm công nghệ chính hãng với chất lượng đảm
              bảo.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="col-12 col-md-3 footer-col">
            <h5 className="fw-bold">Liên kết</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <a href="#">Sản phẩm</a>
              </li>
              <li>
                <a href="#">Giới thiệu</a>
              </li>
              <li>
                <a href="#">Liên hệ</a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div className="col-12 col-md-3 footer-col">
            <h5 className="fw-bold">Hỗ trợ khách hàng</h5>
            <ul className="list-unstyled footer-contact">
              <li>
                <i className="bi bi-telephone-fill"></i> 1800.2097
              </li>
              <li>
                <i className="bi bi-envelope-fill"></i> support@yourbrand.com
              </li>
              <li>
                <i className="bi bi-geo-alt-fill"></i> 216/16 Nguyễn Phước
                Nguyên
              </li>
            </ul>
          </div>

          {/* Cột 4: Mạng xã hội & Ứng dụng */}
          <div className="col-12 col-md-3 footer-col">
            <h5 className="fw-bold">Kết nối với chúng tôi</h5>
            <div className="socials mb-2">
              <a href="#" aria-label="facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" aria-label="instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="tiktok">
                <i className="bi bi-tiktok"></i>
              </a>
              <a href="#" aria-label="youtube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>

            <h6 className="mt-3">Tải ứng dụng</h6>
            <div className="app-badges d-flex flex-wrap align-items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="badge-img"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="badge-img"
              />
            </div>
          </div>
        </div>

        <hr className="border-light my-4" />
        <div className="text-center copy">
          © 2025 YourBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
