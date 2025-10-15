import { Breadcrumb } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./styleUser.css";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { PiUsersFourLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
const API_URL = import.meta.env.VITE_API;

const BangDieuKhien = () => {
  const [soLuongProducts, setSoLuongProducts] = useState({ products: 0 });
  const [soLuongUsers, setSoLuongUsers] = useState({ User: 0 });

  useEffect(() => {
    const getSoLuongProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/demSoLuongSP`);
        console.log("Lấy số lượng sản phẩm thành côgn");
        setSoLuongProducts(response.data);
      } catch (error) {
        console.log("Lỗi không thể lấy số lượng products", error);
      }
    };
    getSoLuongProducts();
  }, []);

  useEffect(() => {
    const getSoLuongUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v2/demSoLuonguser`);
        setSoLuongUsers(response.data);
      } catch (error) {
        console.log("LỖi không thể lấy số lượng users", error);
      }
    };
    getSoLuongUsers();
  }, []);

  return (
    <div>
      <div>
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
            },
            {
              title: "Bảng điều khiển",
            },
          ]}
          style={{
            margin: "16px 0",
          }}
        />
      </div>
      <div className="containerDashboard">
        {/* <h2 className="text-center">Tổng chi tiết</h2> */}
        <div className="flexChiTiet">
          <div className="chiTietLeft">
            <div className="leftIcon">
              <MdOutlineShoppingCartCheckout />
            </div>
            <div className="textLeft">
              <h4>Tổng sản phẩm: ({soLuongProducts.products})</h4>
              <Link
                to="/dashboard/xemsanPham"
                style={{ textDecoration: "none" }}
              >
                Xem chi tiết <GrLinkNext />
              </Link>
            </div>
          </div>
          <div className="chiTietRight">
            <div className="rightIcon">
              <PiUsersFourLight />
            </div>
            <div className="textRight text-center">
              <h4>Tổng người dùng: ({soLuongUsers.User})</h4>
              <Link
                to="/dashboard/xemthongtin"
                style={{ textDecoration: "none" }}
              >
                Xem chi tiết <GrLinkNext />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BangDieuKhien;

{
  /* <p>Total Products: {soLuongProducts.products}</p>
                    <p>Total Users: {soLuongUsers.users}</p> */
}
