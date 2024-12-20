import { Delete as DeleteIcon, Payment, Wallet } from "@mui/icons-material";
import { AuthContext } from "../components/AuthProvider";
import BasketSidebar from "../components/BasketSidebar";
import React, { useState, useEffect, useContext } from "react";
import FlexCenter from "../components/layouts/flex/FlexCenter";
import { deleteProductFromCart, fetchUserCartProducts } from "../utils/fetchProducts";
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";


export default function BasketPage() {
    const { UserAccessJWT } = useContext(AuthContext);
    const [productID, setProductID] = useState(null);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const UserAccessToken = UserAccessJWT();
            try {
                const products = await fetchUserCartProducts(UserAccessToken);
                setProducts(products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const hook = async () => {
            const UserAccessToken = UserAccessJWT();
            const response = await deleteProductFromCart(UserAccessToken, productID);
            console.log(response)
        }

        if (productID) {
            hook();
        }
    }, [productID]);


    const HandleDeleteProductButtonClick = (productID) => {
        setProductID(productID);
    }

    return (
        <React.Fragment>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '320px 1fr 500px',
            }}>
                <BasketSidebar />
                <Box className="tableContainer" sx={{ px: 10, py: 5 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Preview</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>amount</TableCell>
                                <TableCell>price</TableCell>
                                <TableCell>action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow>
                                    <TableCell>
                                        <FlexCenter styles={{ height: '150px', width: '120px' }}>
                                            <Box component="img" src={product.image} sx={{ objectFit: 'cover', width: '100%', borderRadius: '12px' }} />
                                        </FlexCenter>
                                    </TableCell>
                                    <TableCell>
                                        {product.title}
                                        {product.description}
                                    </TableCell>
                                    <TableCell>
                                        {product.id}
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="primary">
                                            {product.price}$
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button color="error"
                                            variant="contained"
                                            endIcon={<DeleteIcon />}
                                            onClick={() => HandleDeleteProductButtonClick(product.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Paper sx={{ m: 3.5, my: 2, borderRadius: '12px', height: '95vh' }}>
                    <Box className="flexWrapper" display="flex" flexDirection="column" sx={{ height: '95vh' }}>
                        <Box sx={{ objectFit: 'cover', width: '100%', flex: 1, margin: 'auto' }}>
                            <Box sx={{ width: '100%', filter: 'drop-shadow(4px 12px 24px black)' }}
                                component="img" src="https://mbank.kg/media/mbusiness/img/m017t0061_march_2522_view02_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_1.png" />
                        </Box>
                        <Box>
                            <Box sx={{ p: 5 }}>
                                <TextField fullWidth focused label="Receiptent name" />
                                <TextField focused label="Date" />
                                <TextField focused label="CVV" />
                                <TextField fullWidth focused label="Card number" />
                            </Box>
                        </Box>
                        <Box sx={{ m: 3.5 }}>
                            <Button size="large" fullWidth variant="contained" endIcon={<Payment />}>Payment</Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </React.Fragment>
    )
}
