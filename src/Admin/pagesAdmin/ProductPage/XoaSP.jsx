import { useEffect, useState } from 'react';
import { Table, Breadcrumb, Button, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import toast from "react-hot-toast";
import './style.css'
const API_URL = import.meta.env.VITE_API;

const XoaSP = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/products`)
                setProducts(response.data)
            } catch (error) {
                console.log('Lỗi trong khi getAllProduct', error);

            }
        };
        getAllProduct();
    }, [])

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/v1/delete/products/${id}`);
            console.log('Xóa sản phẩm thành công', response.data);
            toast.success('Xóa sản phẩm thành công')
            setProducts(products.filter(products => products._id != id)); 
        } catch (error) {
            console.log('Lỗi khi xóa sản phẩm', error);
            toast.error('Khoong thể xóa sản phẩm');
        }
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id',
            render: (anh, record, index) => index + 1,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'image',
            key: 'name',
            render: (anh) => <Image src={anh} alt="Product" style={{ width: 50, height: 50, objectFit: 'cover' }} />
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => {
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(price);
            },
        },
        {
            title: 'Giá gốc',
            dataIndex: 'priceGoc',
            key: 'price',
            render: (priceGoc) => {
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(priceGoc);
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            render: (discount) => `${discount}%`,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Button
                    className="dangerButton"
                    icon={<DeleteOutlined />}
                    onClick={() => deleteProduct(record._id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <div>
            <div>
                <Breadcrumb
                    items={[
                        { title: 'Trang chủ' },
                        { title: 'Mục sản phẩm' },
                        { title: 'Xóas sản phẩm' },
                    ]}
                    style={{ margin: '16px 0' }}
                />
            </div>

            <Table
                dataSource={products} // Cấp dưu liêuj cho bảngbảng
                columns={columns} // cấu hình cột 
                rowKey="id" 
                pagination={{ pageSize: 5 }} // Cấu hình phân trang 
            />
        </div>
    );
};

export default XoaSP;
