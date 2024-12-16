import React, { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";


export default function UserProfilePage() {
    const { user } = useContext(AuthContext);


    return (
        <React.Fragment>
            You have logged in as { user.username }
        </React.Fragment>
    )
}