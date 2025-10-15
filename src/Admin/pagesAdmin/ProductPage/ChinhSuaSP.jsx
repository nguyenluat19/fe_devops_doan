
import { Breadcrumb, Image } from "antd"
import './style.css'
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API;

const ChinhSuaSP = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formProducts, setFormProducts] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
        priceGoc: "",
        quantity: "",
        discount: "",
        rating: "",
        detailImage: "",

    })

    useEffect(() => {
        const updateProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/products/${id}`)
                setFormProducts(response.data)
            } catch (error) {
                toast.error('Bạn phải chọn sản phẩm để update.');
                console.log('Lỗi không thể update sản phẩm', error);
            }
        };
        updateProduct();
    }, [id])


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormProducts({ ...formProducts, [name]: reader.result });
            };
            reader.readAsDataURL(files[0]); // Đọc tệp hình ảnh
        } else {
            setFormProducts({ ...formProducts, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_URL}/api/v1/update/products/${id}`, formProducts)
            console.log('Update sản phẩm thành công', response.data);
            setFormProducts({
                name: "",
                image: "",
                description: "",
                price: "",
                priceGoc: "",
                quantity: "",
                discount: "",
                rating: "",
                detailImage: "",
            });
            toast.success('Update sản phẩm thành công');
            navigate('/dashboard/xemsanPham')
        } catch (error) {
            // toast.error('Lỗi không thể update sản phẩm');
            console.log("Lỗi không thể update sản phẩm", error);

        }
    }

    return (
        <div>
            <div>
                <Breadcrumb
                    items={[
                        { title: 'Trang chủ' },
                        { title: 'Mục sản phẩm' },
                        { title: 'Tạo mới' },
                    ]}
                    style={{ margin: '16px 0' }}
                />
            </div>

            <form className="createProductCha" onSubmit={handleSubmit}>
                <div className="tableCreateLeft">
                    <div className="createLeftIn">
                        <div style={{ marginTop: "10px" }}>
                            <label htmlFor="categoryName" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                                Tên danh mục
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="categoryName"
                                placeholder="Tên danh mục"
                                value={formProducts.name}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "5px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                                required
                            />
                        </div>

                        <div className="giaTableCreate">
                            <div style={{ marginTop: "10px", width: '48%' }}>
                                <label htmlFor="categoryName" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                                    Giá sản phẩm
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="categoryPrice"
                                    placeholder="Giá sản phẩm"
                                    value={formProducts.price}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        padding: "5px",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                    }}
                                    required
                                />
                            </div>
                            <div style={{ marginTop: "10px", width: '50%' }}>
                                <label htmlFor="categoryName" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                                    Giá gốc sản phẩm
                                </label>
                                <input
                                    type="number"
                                    name="priceGoc"
                                    id="categoryPriceGoc"
                                    placeholder="Giá gốc sản phẩm"
                                    value={formProducts.priceGoc}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        padding: "5px",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <label htmlFor="categoryName" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                                Số lượng
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                id="categoryQuantity"
                                placeholder="Số lượng sản phẩm"
                                value={formProducts.quantity}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "5px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                                required
                            />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <label htmlFor="categoryName" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                                Giảm giá
                            </label>
                            <input
                                type="number"
                                name="discount"
                                id="categoryPrice"
                                placeholder="Giamr giá sản phẩm"
                                value={formProducts.discount}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "5px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                                required
                            />
                        </div>

                        {/* <div style={{ marginBottom: "16px", marginTop: "10px" }}>
                            <label htmlFor="parentCategory" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                                Đánh giá
                            </label>
                            <select
                                id="parentCategory"
                                value={formProducts.rating}
                                onChange={handleChange}
                                name="rating"
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",

                                }}
                            >
                                <option value="">Đánh giá (...sao)</option>
                                <option value="category1">1 sao</option>
                                <option value="category2">2 sao</option>
                                <option value="category3">3 sao</option>
                                <option value="category4">4 sao</option>
                                <option value="category5">5 sao</option>

                            </select>
                        </div> */}
                        <div style={{ marginTop: "10px" }}>
                            <label htmlFor="categoryName" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                                Đánh giá
                            </label>
                            <input
                                type="number"
                                id="parentCategory"
                                value={formProducts.rating}
                                onChange={handleChange}
                                name="rating"
                                placeholder="Đánh giá sản phẩm ...(sao)"
                                style={{
                                    width: "100%",
                                    padding: "5px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                                required
                            />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <label htmlFor="categoryName" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                                Chi tiết sản phẩm
                            </label>
                            <input
                                type="text"
                                name="description"
                                id="categoryQuantity"
                                placeholder="Chi tiết sản phẩm"
                                value={formProducts.description}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "5px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="tableCreateRight">
                    <h5 className="text-center mt-2">Phần ảnh sản phẩm</h5>
                    <hr />

                    <div className="form-group mt-3 p-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <label htmlFor="mainImage" style={{ fontWeight: "bold", display: "block", marginBottom: "10px", fontSize: "15px" }}>
                                Upload sản phẩm (1)
                            </label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                style={{
                                    border: "2px dashed rgb(183, 181, 181)",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    width: "100%",
                                    cursor: "pointer",
                                    backgroundColor: "#f0f8ff",
                                    transition: "border-color 0.3s ease",
                                }}
                                onFocus={(e) => e.target.style.borderColor = "rgb(183, 181, 181)"}
                                onBlur={(e) => e.target.style.borderColor = "rgb(183, 181, 181)"}
                            />
                        </div>
                        {formProducts.image && (
                            <div style={{ marginLeft: '10px' }}>
                                <Image
                                    src={formProducts.image}
                                    alt="Hình ảnh sản phẩm"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '2px solid rgb(183, 181, 181)' }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-group mt-3 p-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <label htmlFor="detailImage" style={{ fontWeight: "bold", display: "block", marginBottom: "10px", fontSize: "15px" }}>
                                Upload chi tiết (1)
                            </label>
                            <input
                                type="file"
                                name="detailImage"
                                onChange={handleChange}
                                style={{
                                    border: "2px dashed rgb(183, 181, 181)",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    width: "100%",
                                    cursor: "pointer",
                                    backgroundColor: "#f0f8ff",
                                    transition: "border-color 0.3s ease",
                                }}
                                onFocus={(e) => e.target.style.borderColor = "rgb(183, 181, 181)"}
                                onBlur={(e) => e.target.style.borderColor = "rgb(183, 181, 181)"}
                            />
                        </div>
                        {formProducts.detailImage && (
                            <div style={{ marginLeft: '10px' }}>
                                <Image
                                    src={formProducts.detailImage}
                                    alt="Hình ảnh sản phẩm chi tiết"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '2px solid rgb(183, 181, 181)' }}
                                />
                            </div>
                        )}
                    </div>


                    {/* <div className="form-group  p-2">
                        <label htmlFor="mainImage" style={{ fontWeight: "bold", display: "block", marginBottom: "10px" }}>Upload chi tiết (2)</label>
                        <input type="file" name="detailImages" onChange={handleChange} value={formProducts.detailImages} />
                    </div>
                    <div className="form-group  p-2">
                        <label htmlFor="mainImage" style={{ fontWeight: "bold", display: "block", marginBottom: "10px" }}>Upload chi tiết (3)</label>
                        <input type="file" name="detailImages" onChange={handleChange} value={formProducts.detailImages} />
                    </div> */}

                    <div style={{ marginTop: "40px", textAlign: "center" }}>
                        <button
                            type="submit"
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#1890ff",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Update sản phẩm
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default ChinhSuaSP