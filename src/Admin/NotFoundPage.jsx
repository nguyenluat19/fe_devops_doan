import { Link } from "react-router-dom"
import { BiError } from "react-icons/bi";

const NotFoundPage = () => {
    return (
        <div className="text-center mt-3">
            <h1 style={{ fontSize: '55pt' }}> <BiError /> </h1>
            <h4>Bạn hiện không xem được nội dung này!</h4>
            <p>Lỗi này thường do nội dung chưa được thiết lập hoặc đã xóa</p>
            <button className="mt-2" style={{ padding: '3px 5px', }}>
                <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>Quay lại trang chủ</Link>
            </button>
        </div>
    )
}

export default NotFoundPage
