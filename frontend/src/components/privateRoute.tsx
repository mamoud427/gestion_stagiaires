import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// interface PrivateRouteProps {
//     children: React.ReactNode;
// }

const PrivateRoute: React.FC = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <><Outlet/></>;
};

export default PrivateRoute;