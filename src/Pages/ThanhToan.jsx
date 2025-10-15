import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [replyComment, setReplyComment] = useState({});

  // Hàm để lấy tất cả bình luận
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v4/all-reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy bình luận:", error);
    }
  };

  // Hàm để gửi bình luận trả lời
  const replyToReview = async (reviewId) => {
    try {
      await axios.post(`${API_URL}/api/v4/reviews/${reviewId}/reply`, {
        reply: replyComment[reviewId],
      });
      // Reset bình luận trả lời
      setReplyComment({ ...replyComment, [reviewId]: "" });
      toast.success("Reply message thanh cong");
    } catch (error) {
      console.error("Lỗi khi trả lời bình luận:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div id="reviews">
      <h2>Tất cả bình luận</h2>
      <div id="review-list">
        {reviews.map((review) => (
          <div key={review._id} className="review">
            <p>
              <strong>{review.user.name}</strong> (Email: {review.user.email}):{" "}
              {review.comment}
            </p>
            <p>Rating: {review.rating}</p>

            {/* Form trả lời bình luận */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                replyToReview(review._id);
              }}
            >
              <textarea
                value={replyComment[review._id] || ""}
                onChange={(e) =>
                  setReplyComment({
                    ...replyComment,
                    [review._id]: e.target.value,
                  })
                }
                placeholder="Trả lời bình luận..."
              />
              <button type="submit">Gửi</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
