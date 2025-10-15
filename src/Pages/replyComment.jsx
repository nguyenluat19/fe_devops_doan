import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Thêm thư viện toast nếu có
const API_URL = import.meta.env.VITE_API;

const ReplyComment = () => {
    const [reviews, setReviews] = useState([]);
    const [replies, setReplies] = useState({});
    const [loading, setLoading] = useState(false);

    // Gọi API lấy danh sách bình luận
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/api/v4/all-reviews`);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error("Lỗi khi lấy bình luận:", error);
                toast?.error("Không thể tải bình luận") || alert("Không thể tải bình luận");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    // Xử lý nhập phản hồi
    const handleReplyChange = (reviewId, value) => {
        setReplies((prevReplies) => ({
            ...prevReplies,
            [reviewId]: value,
        }));
    };

    // Gửi phản hồi lên server - SỬA ENDPOINT API
    const handleReplySubmit = async (reviewId) => {
        if (!replies[reviewId]) {
            toast?.error("Vui lòng nhập phản hồi!") || alert("Vui lòng nhập phản hồi!");
            return;
        }

        try {
            setLoading(true);
            // ĐÃ SỬA ENDPOINT Ở ĐÂY
            const response = await axios.post(`${API_URL}/api/v4/reviews/${reviewId}/reply`, {
                reply: replies[reviewId],
            });

            if (response.data.success) {
                toast?.success("Phản hồi thành công!") || alert("Phản hồi thành công!");

                // Cập nhật state reviews
                setReviews((prevReviews) =>
                    prevReviews.map((review) =>
                        review._id === reviewId ? { ...review, reply: replies[reviewId] } : review
                    )
                );

                // Reset input phản hồi
                setReplies((prevReplies) => ({ ...prevReplies, [reviewId]: "" }));
            }
        } catch (error) {
            console.error("Lỗi khi phản hồi:", error);
            const errorMessage = error.response?.data?.message || "Phản hồi thất bại!";
            toast?.error(errorMessage) || alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Danh sách bình luận</h2>
            {loading && <p>Đang tải...</p>}
            {!loading && reviews.length === 0 ? (
                <p>Không có bình luận nào.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <h3>{review.user?.name || "Người dùng ẩn danh"}</h3>
                        <p><strong>Đánh giá:</strong> {review.rating}/5</p>
                        <p><strong>Bình luận:</strong> {review.comment}</p>
                        <p><strong>Sản phẩm:</strong> {review.product?.name || "Không rõ"}</p>
                        <p><strong>Ngày đánh giá:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>

                        {review.reply && (
                            <div className="reply-box">
                                <p><strong>Phản hồi:</strong> {review.reply}</p>
                            </div>
                        )}

                        {!review.reply && (
                            <>
                                <textarea
                                    value={replies[review._id] || ""}
                                    onChange={(e) => handleReplyChange(review._id, e.target.value)}
                                    placeholder="Nhập phản hồi..."
                                    disabled={loading}
                                />
                                <button
                                    onClick={() => handleReplySubmit(review._id)}
                                    disabled={loading || !replies[review._id]}
                                >
                                    {loading ? "Đang gửi..." : "Trả lời"}
                                </button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ReplyComment;