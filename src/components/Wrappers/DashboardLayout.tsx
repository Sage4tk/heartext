import { Outlet } from "react-router-dom";
import AuthenticationCheck from "./AuthenticationCheck";
import DashboardNav from "../resuable/DashboardNav";

const DashboardLayout:React.FC = () => {
    return (
        <AuthenticationCheck>

            <DashboardNav>

                <Outlet />

            </DashboardNav>
            
        </AuthenticationCheck>
    )
}

export default DashboardLayout;