import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { FaGift, FaTruck, FaPercent } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import styles from './Notification.module.css';

const Notification = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('auth') || sessionStorage.getItem('auth');
        const hasSeenNotificationThisSession = sessionStorage.getItem('hasSeenNotification');

        if (isLoggedIn && !hasSeenNotificationThisSession) {
            setTimeout(() => setIsVisible(true), 500); // Thêm delay nhỏ
        } else if (!isLoggedIn) {
            setTimeout(() => setIsVisible(true), 500);
        }
    }, []);

    const closeNotification = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('hasSeenNotification', 'true');
        }, 300); // Đợi animation kết thúc
    };

    if (!isVisible) return null;

    return (
        <div className={`${styles.notificationOverlay} ${isClosing ? styles.fadeOut : ''}`}>
            <div className={`${styles.notificationContainer} ${isClosing ? styles.slideOut : ''}`}>
                <div className={styles.notificationHeader}>
                    <div className={styles.titleWithIcon}>
                        <MdCelebration size={22} className={styles.celebrationIcon} />
                        <h3>⭐ Ưu đãi đặc biệt ⭐</h3>
                    </div>
                    <button
                        className={styles.closeButton}
                        onClick={closeNotification}
                        aria-label="Đóng thông báo"
                    >
                        <IoClose />
                    </button>
                </div>
                <div className={styles.notificationContent}>
                    <div className={styles.welcomeMessage}>
                        <p>Chào mừng bạn đến với website của chúng tôi! 🎉</p>
                    </div>
                    <p>Hiện tại chúng tôi đang có chương trình khuyến mãi đặc biệt:</p>
                    <ul className={styles.promotionList}>
                        <li>
                            <FaPercent className={styles.icon} />
                            <span>Giảm giá <strong>15%</strong> cho tất cả sản phẩm mới</span>
                        </li>
                        <li>
                            <FaTruck className={styles.icon} />
                            <span>Miễn phí vận chuyển cho đơn hàng trên <strong>500.000đ</strong></span>
                        </li>
                        <li>
                            <FaGift className={styles.icon} />
                            <span>Trả góp <strong>0%</strong> lãi suất cho các sản phẩm cao cấp</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.notificationFooter}>
                    <button className={styles.acceptButton} onClick={closeNotification}>
                        Đã hiểu
                    </button>
                </div>
                <div className={styles.bubbles}>
                    <div className={styles.bubble}></div>
                    <div className={styles.bubble}></div>
                    <div className={styles.bubble}></div>
                    <div className={styles.bubble}></div>
                    <div className={styles.bubble}></div>
                </div>
            </div>
        </div>
    );
};

export default Notification;