import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./src/context/AuthContext"

function ProtectedRoute() {
    const { loading, user, isAuthenticated } = useAuth();

    if(loading) {
        <h1> Loading...</h1>
    }
    if (!loading && !isAuthenticated) return <Navigate to="/login" />

    return <Outlet />
}

export default ProtectedRoute