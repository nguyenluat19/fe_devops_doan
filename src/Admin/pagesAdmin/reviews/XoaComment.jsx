import { Breadcrumb } from "antd"


const XoaComment = () => {
    return (
        <div>
            <div>
                <Breadcrumb
                    items={[
                        {
                            title: 'Trang chủ',
                        },
                        {
                            title: 'QL người dùng',
                        },
                        {
                            title: 'Xoa comment'
                        }

                    ]}
                    style={{
                        margin: '16px 0',
                    }}
                />
            </div>
            <div>
                <h1>helloo xoa comment</h1>
            </div>
        </div>
    )
}

export default XoaComment
