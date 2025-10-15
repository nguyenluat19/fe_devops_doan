import { Content } from "antd/es/layout/layout"
import { Outlet } from "react-router-dom"


const LayoutDashboard = () => {
    return (
        <div>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    // eslint-disable-next-line no-undef
                    background: colorBgContainer,
                    // eslint-disable-next-line no-undef
                    borderRadius: borderRadiusLG,
                }}
            >
                <Outlet />
            </Content>
        </div>
    )
}

export default LayoutDashboard