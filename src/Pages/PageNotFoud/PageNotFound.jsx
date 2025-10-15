import { Link } from "react-router-dom"
import Layout from "../../components/Layout/Layout"
import { BiError } from "react-icons/bi";

const PageNotFound = () => {
    return (
        <Layout>
            <div className="text-center" style={{ marginTop: '180px' }}>
                <h1 style={{ fontSize: '55pt' }}> <BiError /> </h1>
                <h4>Bạn hiện không xem được nội dung này!</h4>
                <p>Lỗi này thường do nội dung chưa được thiết lập hoặc đã xóa</p>
                <button className="mt-2" style={{ padding: '3px 5px', marginBottom: '70px' }}>
                    <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>Quay lại trang chủ</Link>
                </button>
            </div>
        </Layout>
    )
}

export default PageNotFound
