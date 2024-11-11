import { Navigate } from "react-router-dom";
import { useUser } from "./AuthWrapper"

const AuthenticationCheck:React.FC<{children: React.ReactNode}> = ({
    children
}) => {

    // STATE
    const { user, loading } = useUser();

    // if loading set loading screen
    if (loading) return (
        <div></div>
    )

    return user ? children : <Navigate to="/login" />

}

export default AuthenticationCheck;