import { Link, NavLink, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { Badge } from "antd";
import { SlHandbag } from "react-icons/sl";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { AiTwotoneDashboard } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useCart } from "../../context/cart";

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sliderTop, setSliderTop] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Đăng xuất thành công");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    setSliderTop(window.scrollY > 50 ? -50 : 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?keyword=${searchTerm}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className="fixed w-full bg-[#e9efff] text-gray-800 py-2.5 z-[1001] transition-all duration-300"
        style={{ top: `${sliderTop}px` }}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto gap-2.5 px-4">
          <img
            src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Giao%20hang.svg"
            alt="Banner"
            className="w-[250px] cursor-pointer max-w-[180px] sm:max-w-[250px]"
          />
          <img
            src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Thu%20cu.svg"
            alt="Banner"
            className="w-[250px] cursor-pointer max-w-[180px] sm:max-w-[250px]"
          />
          <img
            src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Chinh%20hang.svg"
            alt="Banner"
            className="w-[250px] cursor-pointer max-w-[180px] sm:max-w-[250px]"
          />
          <img
            src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Smember.svg"
            alt="Banner"
            className="w-[250px] cursor-pointer max-w-[180px] sm:max-w-[250px]"
          />
        </div>
      </div>
      <header
        className={`fixed w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-[1000] transition-all duration-300 px-3 sm:px-4  py-2 ${
          sliderTop === 0 ? "top-[40px]" : "top-0"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="logo-website">
            <Link
              to="/"
              className="text-sm lg:text-lg font-bold text-gray-800 no-underline"
              onClick={handleClick}
            >
              mualike.io.vn
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex-1 flex justify-center ">
            <div className="flex items-center w-full md:w-2/3 px-2 lg:px-0 transition-all duration-300">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow px-3 border w-full border-gray-300 rounded-l-md text-base focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              <button
                type="submit"
                onClick={handleSearch}
                className="bg-blue-700 text-white py-1 px-4 rounded-r-md hover:bg-[#1f3f5f] transition-colors duration-300"
              >
                <GrSearch className="text-lg" />
              </button>
            </div>
          </div>

          {/* Desktop layout (lg and above) */}
          <div className="hidden lg:flex items-center space-x-5">
            {!auth.user ? (
              <>
                <Link
                  to="/login"
                  onClick={handleClick}
                  className="text-white bg-blue-700 px-3.5 py-2 rounded font-bold text-base hover:bg-[#1f3f5f] transition-colors duration-300"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={handleClick}
                  className="text-white bg-blue-700 px-3.5 py-2 rounded font-bold text-base hover:bg-[#1f3f5f] transition-colors duration-300"
                >
                  Đăng ký
                </Link>
              </>
            ) : (
              <div className="relative flex items-center gap-3">
                <Badge
                  count={totalQuantity}
                  showZero
                  className="mr-0"
                  overflowCount={99}
                >
                  <NavLink to="/cart">
                    <SlHandbag className="text-2xl text-gray-800 cursor-pointer" />
                  </NavLink>
                </Badge>
                <button
                  className="flex items-center justify-center bg-transparent rounded-full p-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaCircleUser className="text-[30px] text-gray-800" />
                </button>

                {isDropdownOpen && (
                  <motion.ul
                    className="absolute right-0 top-[50px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] rounded p-2 min-w-[180px] z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <li className="text-gray-500 text-center text-sm mb-2">
                      {auth.user ? `👤 ${auth.user.name}` : "Tài khoản"}
                    </li>
                    <li>
                      <NavLink
                        to="/orders"
                        className="flex items-center px-2 py-1.5 text-gray-800 hover:bg-gray-100 rounded text-sm"
                      >
                        <FaRegUser className="mr-2" /> Orders
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/profile-user"
                        className="flex items-center px-2 py-1.5 text-gray-800 hover:bg-gray-100 rounded text-sm"
                      >
                        <FaRegUser className="mr-2" /> Profile
                      </NavLink>
                    </li>
                    {auth.user?.role === 1 && (
                      <li>
                        <NavLink
                          to="/dashboard"
                          className="flex items-center px-2 py-1.5 text-gray-800 hover:bg-gray-100 rounded text-sm"
                        >
                          <AiTwotoneDashboard className="mr-2" /> Dashboard
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <hr className="my-2" />
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={handleLogout}
                        className="flex items-center px-2 py-1.5 text-red-500 hover:bg-gray-100 rounded text-sm"
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </NavLink>
                    </li>
                  </motion.ul>
                )}
              </div>
            )}
          </div>

          {/* Hamburger menu for mobile (below lg) */}
          <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
            <div className="w-[25px] h-[3px] bg-gray-800 my-[5px]"></div>
            <div className="w-[25px] h-[3px] bg-gray-800 my-[5px]"></div>
            <div className="w-[25px] h-[3px] bg-gray-800 my-[5px]"></div>
          </div>

          {/* Mobile dropdown menu */}
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-[45px] left-0 w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] p-3 flex flex-row items-end z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {auth.user && (
                <div className="w-full flex mb-4">
                  <Badge count={totalQuantity} showZero overflowCount={99}>
                    <NavLink
                      to="/cart"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center text-gray-800 hover:text-blue-700"
                    >
                      <SlHandbag className="text-2xl mr-2" /> Cart (
                      {totalQuantity})
                    </NavLink>
                  </Badge>
                </div>
              )}

              {!auth.user ? (
                <div className="items-center flex w-full justify-center gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white bg-blue-700 px-3.5 py-2 rounded font-bold text-base hover:bg-[#1f3f5f] transition-colors duration-300  w-full text-center"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white bg-blue-700 px-3.5 py-2 rounded font-bold text-base hover:bg-[#1f3f5f] transition-colors duration-300 w-full text-center"
                  >
                    Đăng ký
                  </Link>
                </div>
              ) : (
                <div className="relative w-full text-right">
                  <button
                    className="flex items-center justify-center bg-gray-100 rounded-full p-2 ml-auto mb-2"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <FaCircleUser className="text-[30px] text-gray-800" />
                    <span className="ml-2 text-sm font-medium">
                      {auth.user.name}
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <motion.ul
                      className="absolute right-0 top-12 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] rounded p-2 min-w-[180px] z-20"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <li className="text-gray-500 text-center text-sm mb-2">
                        👤 {auth.user.name}
                      </li>
                      <li>
                        <NavLink
                          to="/orders"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center px-2 py-1.5 text-gray-800 hover:bg-gray-100 rounded text-sm"
                        >
                          <FaRegUser className="mr-2" /> Orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/profile-user"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center px-2 py-1.5 text-gray-800 hover:bg-gray-100 rounded text-sm"
                        >
                          <FaRegUser className="mr-2" /> Profile
                        </NavLink>
                      </li>
                      {auth.user?.role === 1 && (
                        <li>
                          <NavLink
                            to="/dashboard"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsDropdownOpen(false);
                            }}
                            className="flex items-center px-2 py-1.5 text-gray-800 hover:bg-gray-100 rounded text-sm"
                          >
                            <AiTwotoneDashboard className="mr-2" /> Dashboard
                          </NavLink>
                        </li>
                      )}
                      <li>
                        <hr className="my-2" />
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center px-2 py-1.5 text-red-500 hover:bg-gray-100 rounded text-sm"
                        >
                          <FaSignOutAlt className="mr-2" /> Logout
                        </NavLink>
                      </li>
                    </motion.ul>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
