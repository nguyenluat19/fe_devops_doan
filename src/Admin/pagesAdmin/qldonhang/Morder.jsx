import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Morder.module.css";
import { Image } from "antd";
import toast from "react-hot-toast";
import { GoHome } from "react-icons/go";
import { MdNavigateNext } from "react-icons/md";
import Layout from "../../../components/Layout/Layout";
import { useAuth } from "../../../context/auth";
const API_URL = import.meta.env.VITE_API || "http://localhost:3000";
const STATUSES = [
  "Pending",
  "Paid",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function Morder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/v3/getAllOrder`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("Lấy danh sách đơn hàng thất bại:", err);
      toast.error("Không thể lấy danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const saveStatus = async (orderId) => {
    // find order by _id
    const order = orders.find((o) => o._id === orderId);
    if (!order) {
      toast.error("Không tìm thấy đơn hàng để lưu");
      return;
    }

    setSavingId(orderId);

    try {
      // token from context or fallback to localStorage
      const token =
        (typeof auth !== "undefined" && auth?.token) ||
        localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "Không tìm thấy token xác thực. Vui lòng đăng nhập lại."
        );
      }

      // debug: show the request we will send
      console.log(
        "Updating order",
        orderId,
        "status ->",
        order.status,
        "API_URL:",
        API_URL
      );

      const resp = await axios.put(
        `${API_URL}/api/v3/orders/${orderId}/status`,
        { status: order.status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("Update order response:", resp.data);
      toast.success("Cập nhật trạng thái thành công");
      // refresh list / update local state
      await fetchOrders();
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);

      // Detailed error logging to help you debug
      if (err.response) {
        // Server responded with status code outside 2xx
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
        toast.error(
          `Cập nhật thất bại: ${
            err.response.data?.message || err.response.status
          }`
        );
      } else if (err.request) {
        // Request made but no response
        console.error("No response received. Request:", err.request);
        toast.error(
          "Không nhận được phản hồi từ server. Kiểm tra server/CORS."
        );
      } else {
        // Something else happened
        console.error("Error message:", err.message);
        toast.error(`Lỗi: ${err.message}`);
      }
    } finally {
      setSavingId(null);
    }
  };

  return (
    <Layout title="Quản lý đơn hàng">
      <div className={styles.container}>
        <div className={styles.inner}>
          <p className={styles.breadcrumb}>
            <GoHome /> Trang chủ <MdNavigateNext /> Đơn hàng
          </p>

          {loading ? (
            <div className={styles.loading}>Đang tải danh sách đơn hàng...</div>
          ) : orders.length === 0 ? (
            <div className={styles.empty}>Chưa có đơn hàng nào</div>
          ) : (
            <div className={styles.list}>
              {orders.map((order) => (
                <div className={styles.card} key={order._id}>
                  <div className={styles.left}>
                    <Image
                      src={
                        // ưu tiên image từ populated product; fallback tới array image trong order nếu có
                        order.products?.[0]?.product?.image ||
                        order.products?.[0]?.image ||
                        "/placeholder.png"
                      }
                      alt={
                        order.products?.[0]?.product?.name ||
                        order.products?.[0]?.name ||
                        "Sản phẩm"
                      }
                      preview={false}
                      className={styles.thumb}
                    />
                  </div>

                  <div className={styles.center}>
                    <h3 className={styles.title}>
                      Người đặt: {order.user?.name || "—"}{" "}
                      <span className={styles.small}>
                        ({order.user?.email})
                      </span>
                    </h3>

                    <div className={styles.row}>
                      <div>Địa chỉ:</div>
                      <div className={styles.value}>{order.address || "—"}</div>
                    </div>

                    <div className={styles.row}>
                      <div>SĐT:</div>
                      <div className={styles.value}>{order.phone || "—"}</div>
                    </div>

                    <div className={styles.row}>
                      <div>Tổng tiền:</div>
                      <div className={styles.value}>
                        {(order.totalPrice || 0).toLocaleString("vi-VN")}đ
                      </div>
                    </div>

                    <div className={styles.products}>
                      {order.products?.map((p, i) => {
                        const prodName =
                          p.product?.name || p.name || "Sản phẩm không tên";
                        const prodPrice = (p.price || 0).toLocaleString(
                          "vi-VN"
                        );
                        return (
                          <div key={i} className={styles.productLine}>
                            <span className={styles.prodName}>{prodName}</span>
                            <span className={styles.prodMeta}>
                              {prodPrice}đ × {p.quantity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.right}>
                    <div className={styles.row}>
                      <label className={styles.label}>Trạng thái</label>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={styles.select}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className={styles.saveBtn}
                      onClick={() => saveStatus(order._id)}
                      disabled={savingId === order._id}
                    >
                      {savingId === order._id ? "Đang lưu..." : "Lưu"}
                    </button>

                    <div className={styles.meta}>
                      <div>ID: {order._id}</div>
                      <div>
                        Ngày:{" "}
                        {new Date(order.createdAt).toLocaleString("vi-VN")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
