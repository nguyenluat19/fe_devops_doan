import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { LuPenLine } from "react-icons/lu";

const ProfileUser = () => {
  const [auth] = useAuth();
  console.log(auth);

  const navigate = useNavigate();

  return (
    <Layout title="Profile User">
      <div className="w-full max-w-4xl mt-[110px] mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="flex flex-col lg:flex-row gap-6 mb-5">
          <div className="w-full lg:w-[350px] bg-white rounded-xl shadow-md text-center p-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              alt="Avatar"
              className="w-48 h-48 rounded-full mx-auto mb-4"
            />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{auth.user.name}</h4>
            <div className="text-sm text-gray-600">{auth.user.address}</div>
          </div>
          <div className="w-full bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Thông tin cá nhân</h3>
              <div
                className="text-2xl text-blue-700 cursor-pointer hover:text-blue-800 transition-colors duration-300"
                onClick={() => navigate("/update-profile")}
              >
                <LuPenLine />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm sm:text-base">
                <span className="sm:min-w-[120px] font-medium text-gray-600">Họ và tên:</span>
                <span>{auth.user.name}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex items-center gap-4 text-sm sm:text-base">
                <span className="sm:min-w-[120px] font-medium text-gray-600">Email:</span>
                <span>{auth.user.email}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex items-center gap-4 text-sm sm:text-base">
                <span className="sm:min-w-[120px] font-medium text-gray-600">Số điện thoại:</span>
                <span>{auth.user.phone}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex items-center gap-4 text-sm sm:text-base">
                <span className="sm:min-w-[120px] font-medium text-gray-600">Giới tính:</span>
                <span>{auth.user.gender}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex items-center gap-4 text-sm sm:text-base">
                <span className="sm:min-w-[120px] font-medium text-gray-600">Địa chỉ:</span>
                <span>{auth.user.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileUser;
