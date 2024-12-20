import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import searchProducts from "../utils/searchProducts";


export default function UserProfilePage() {
    const [inputData, setInputData] = useState('');
    const { user, UserAccessJWT } = useContext(AuthContext);


    const HandleInput = (event) => {
        setInputData(event.target.value);

        const fetchProducts = async () => {
            const products = await searchProducts(inputData);
            console.table(products);
        }
        
        setTimeout(() => {
            fetchProducts();
        }, 500);
    }

    return (
        <React.Fragment>
            <TextField label="Products" onChange={HandleInput}/>
        </React.Fragment>
    )
}