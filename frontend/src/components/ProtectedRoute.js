import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import LoadingBackdrop from "./LoadingBackdrop";


export default function ProtectedRoute({ Component, ...props }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <LoadingBackdrop />
        )
    }

    return user ? (
        <Component {...props} />
    ) : (
        <Navigate to="/login" />
    );
}