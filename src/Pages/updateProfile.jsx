import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.user.name,
    email: auth.user.email,
    phone: auth.user.phone,
    gender: auth.user.gender,
    address: auth.user.address,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuth({ ...auth, user: formData });
    toast.success("Cập nhật thông tin thành công!");
    navigate("/profile-user");
  };

  return (
    <Layout title="Cập nhật thông tin">
      <div className="flex justify-center items-center py-4 min-h-[80vh] px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="w-full max-w-md mt-[60px] lg:mt-[110px] p-6 sm:p-8 bg-white rounded-xl shadow-lg text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Cập nhật thông tin cá nhân
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-600 mb-1">Họ và tên:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-600 mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-600 mb-1">Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-600 mb-1">Giới tính:</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-600 mb-1">Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#2e5986] focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
              />
            </div>
            <button
              type="submit"
              className="mt-4 py-3 bg-[#2e5986] text-white rounded-lg font-bold text-base hover:bg-[#2e5986] hover:scale-105 transition-all duration-300"
            >
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfile;
