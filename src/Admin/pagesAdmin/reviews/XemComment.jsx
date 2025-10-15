import { Breadcrumb } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./xemComment.module.css";
import { CiPaperplane } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const API_URL = import.meta.env.VITE_API;

const XemComment = () => {
    const [reviews, setReviews] = useState([]);
    const [replyComment, setReplyComment] = useState({});
    const [loading, setLoading] = useState(false);

    // Hàm lấy tất cả bình luận (bao gồm cả phản hồi)
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v4/all-reviews`);
            console.log("Fetched reviews data:", response.data);
            setReviews(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy bình luận:", error);
            toast.error("Không thể tải bình luận. Vui lòng thử lại sau.");
        }
    };

    // Hàm gửi phản hồi bình luận
    const replyToReview = async (reviewId) => {
        if (!replyComment[reviewId] || replyComment[reviewId].trim() === "") {
            toast.error("Vui lòng nhập nội dung phản hồi");
            return;
        }
        setLoading(true);
        try {
            console.log("Gửi bình luận:", replyComment[reviewId]);

            const response = await axios.post(
                `${API_URL}/api/v4/reviews/${reviewId}/reply`,
                { reply: replyComment[reviewId] },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Phản hồi từ server:", response.data);
            console.log("Chi tiết review từ server:", JSON.stringify(response.data.review, null, 2));

            // Cập nhật review ngay trong state với phương pháp mới
            if (response.data && response.data.success) {
                // Lấy bản sao của review đã có
                const currentReview = reviews.find(r => r._id === reviewId) || {};

                // Tạo bản cập nhật với phản hồi mới
                const updatedReview = {
                    ...response.data.review,
                    // Đảm bảo reply field được cập nhật
                    reply: replyComment[reviewId],
                    // Đảm bảo mảng replies được cập nhật đúng cách
                    replies: [
                        ...(Array.isArray(currentReview.replies) ? currentReview.replies : []),
                        replyComment[reviewId]
                    ]
                };

                setReviews(prevReviews =>
                    prevReviews.map(review =>
                        review._id === reviewId ? updatedReview : review
                    )
                );

                console.log("Đã cập nhật reviews với data:", updatedReview);
                toast.success("Reply message thành công");
            } else {
                console.log("Đang fetch lại reviews vì không tìm thấy review trong response");
                await fetchReviews();
            }

            // Xóa nội dung input sau khi gửi
            setReplyComment({ ...replyComment, [reviewId]: "" });
        } catch (error) {
            console.error("Lỗi khi trả lời bình luận:", error.response ? error.response.data : error);
            toast.error("Lỗi khi gửi phản hồi!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const hanldXoaBl = async (reviewId, e) => {
        // Ngăn sự kiện click lan ra nút Submit của form
        e.preventDefault();
        e.stopPropagation();

        try {
            await axios.delete(`${API_URL}/api/v4/reviews/delete/${reviewId}`);
            setReviews((prevReviews) => prevReviews.filter((comment) => comment._id !== reviewId));
            toast.success('Xóa bình luận thành công');
        } catch (error) {
            console.error("Lỗi khi xóa bình luận:", error);
            toast.error("Không thể xóa bình luận. Vui lòng thử lại.");
        }
    };

    return (
        <>
            <Breadcrumb
                items={[
                    { title: "Trang chủ" },
                    { title: "QL người dùng" },
                    { title: "Xem comment" },
                ]}
                style={{ margin: "16px 0" }}
            />

            <div id="reviews" className={styles.wrapAllComment}>
                <h3 className="text-center">Quản lý bình luận</h3>
                <div id="review-list" className={styles.allComment}>
                    {reviews.length === 0 ? (
                        <p className="text-center">Không có bình luận nào</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review._id} className={styles.review}>
                                <p>
                                    <strong>{review.user?.name || "Unknown User"}</strong>
                                    (Email: {review.user?.email || "No Email"}): {review.comment}
                                </p>

                                <p>Đánh giá: {review.rating} sao</p>

                                {/* Hiển thị phản hồi - xử lý mọi dạng dữ liệu có thể có */}
                                {review.reply || (review.replies && review.replies.length > 0) ? (
                                    <div className={styles.replies}>
                                        <strong>Phản hồi:</strong>
                                        {review.reply && (
                                            <p className={styles.replyItem}>
                                                ➥ {typeof review.reply === 'string' ? review.reply : JSON.stringify(review.reply)}
                                            </p>
                                        )}
                                        {review.replies && Array.isArray(review.replies) && review.replies.map((reply, index) => (
                                            <p key={index} className={styles.replyItem}>
                                                ➥ {typeof reply === 'string' ? reply : JSON.stringify(reply)}
                                            </p>
                                        ))}
                                    </div>
                                ) : null}

                                {/* Form trả lời bình luận */}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        replyToReview(review._id);
                                    }}
                                    className={styles.formReplyBl}
                                >
                                    <textarea
                                        value={replyComment[review._id] || ""}
                                        onChange={(e) => setReplyComment({ ...replyComment, [review._id]: e.target.value })}
                                        placeholder="Trả lời bình luận..."
                                        disabled={loading}
                                    />
                                    <div className={styles.wrapButtonGuiBl}>
                                        <button
                                            className={styles.buttonXoaBl}
                                            onClick={(e) => hanldXoaBl(review._id, e)}
                                            disabled={loading}
                                            type="button"
                                        >
                                            Xóa
                                            <MdDeleteOutline style={{ fontSize: "20px", marginLeft: "5px" }} />
                                        </button>
                                        <button
                                            className={styles.buttonGuiBl}
                                            type="submit"
                                            disabled={loading}
                                        >
                                            Gửi bình luận
                                            <CiPaperplane style={{ fontSize: "20px", marginLeft: "5px" }} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default XemComment;