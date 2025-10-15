import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CiPaperplane } from "react-icons/ci";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const CommentSection = () => {
  const { id } = useParams();
  const [auth] = useAuth();
  const [comments, setComments] = useState([]);
  const [hoveredComment, setHoveredComment] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [totalCmt, setTotalCmt] = useState([]);

  const API_URL = import.meta.env.VITE_API;

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`${API_URL}/api/v4/reviews/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy bình luận:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async (commentId) => {
    if (!window.confirm("Bạn có chắc muốn xóa bình luận này không?")) return;

    try {
      await axios.delete(`${API_URL}/api/v4/reviews/delete/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error);
      toast.error("Không thể xóa bình luận. Vui lòng thử lại.");
    }
  };

  const handleLogin = () => {
    navigate("/login", { state: "/cart" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || rating === 0) {
      toast.error("Vui lòng nhập nội dung bình luận và chọn đánh giá sao.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/v4/reviews`,
        {
          userId: auth?.user?.id,
          productId: id,
          rating: rating,
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setComments([response.data.review, ...comments]);
      setNewComment("");
      setRating(0);
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error.response?.data || error.message);
      toast.error("Không thể gửi bình luận. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getTotalOneProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v4/reviews/total/${id}`);
        console.log("Tổng số bình luận:", response.data);
        setTotalCmt(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalOneProduct();
  }, [id]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Bình luận về sản phẩm</h4>
        <div className="text-sm text-gray-600">
          Tổng số bình luận: <strong>({totalCmt.totalReviews})</strong>
        </div>
      </div>

      <div className="w-full mb-6">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl cursor-pointer ${
                  star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Nhập bình luận của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className="w-full h-24 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e5986] resize-none"
          />
          <div className="flex justify-end mt-2">
            {auth?.token ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 bg-[#2e5986] text-white rounded-md hover:bg-[#2e5986] transition-colors duration-300 text-sm disabled:opacity-50"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
                <CiPaperplane className="ml-2 text-lg" />
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300 text-sm"
              >
                Vui lòng đăng nhập
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Đang tải bình luận...</p>
      ) : (
        <div className="flex flex-col gap-5">
          {comments.length > 0 ? (
            comments.map((cmt, index) => (
              <div
                key={cmt._id}
                className="relative flex flex-col gap-3 p-4 bg-white rounded-lg shadow-sm"
                onMouseEnter={() => setHoveredComment(index)}
                onMouseLeave={() => setHoveredComment(null)}
              >
                <header className="flex justify-between items-center">
                  <strong className="text-gray-800 mr-3">{cmt.user?.name || "Người dùng"}</strong>
                  <small className="text-gray-500">{new Date(cmt.createdAt).toLocaleString()}</small>
                </header>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${star <= cmt.rating ? "text-yellow-400" : "text-gray-400"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-800 text-base">{cmt.comment}</p>

                {hoveredComment === index && (
                  <span
                    className="absolute top-3 right-3 text-lg text-red-600 cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(cmt._id)}
                  >
                    🗑️
                  </span>
                )}

                {cmt.replies && cmt.replies.length > 0 && (
                  <div className="mt-3 pl-5 border-l-4 border-gray-300">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Phản hồi:</h4>
                    {cmt.replies.map((reply, rIndex) => (
                      <div key={rIndex} className="flex flex-col gap-2 mb-3">
                        <header className="flex justify-between items-center">
                          <strong className="text-gray-800">{auth?.user?.name || "Người dùng"}</strong>
                          <small className="text-gray-500">{new Date(reply.createdAt).toLocaleString()}</small>
                        </header>
                        <p className="text-gray-800 text-sm">{reply.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
                {cmt.reply && (
                  <div className="self-end p-3 bg-blue-50 rounded-lg max-w-[60%]">
                    <h4 className="text-sm font-semibold text-blue-700 mb-2">Phản hồi từ cửa hàng:</h4>
                    <p className="text-gray-800 text-sm">{cmt.reply}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-base">Chưa có bình luận nào.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
