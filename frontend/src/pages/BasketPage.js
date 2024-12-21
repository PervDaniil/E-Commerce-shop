import {
    ShoppingCart as ShoppingCartIcon,
    Payment as DebitCardIcon,
    Delete as DeleteIcon,
    Close as CloseIcon,
    Add as AddIcon,
} from "@mui/icons-material";
import { deleteProductFromCart, fetchUserCartProducts } from "../utils/fetchProducts";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Button, Card, CardContent, Typography, IconButton, Grid, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, SvgIcon } from "@mui/material";
import FlexSpaceEvenly from "../components/layouts/flex/FlexSpaceEvenly";
import FlexSpaceBetween from "../components/layouts/flex/FlexSpaceBetween";

export default function BasketPage() {
    const { UserAccessJWT } = useContext(AuthContext);
    const [productID, setProductID] = useState(null);
    const [products, setProducts] = useState([]);

    // Fetch user cart products on initial render or when UserAccessJWT changes
    useEffect(() => {
        const fetchData = async () => {
            const UserAccessToken = UserAccessJWT();
            try {
                const fetchedProducts = await fetchUserCartProducts(UserAccessToken);
                setProducts(fetchedProducts);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [UserAccessJWT]);

    // Handle the deletion of a product from the cart
    useEffect(() => {
        if (!productID) return;

        const DeleteProductFromCartHandler = async () => {
            const UserAccessToken = UserAccessJWT();
            try {
                const response = await deleteProductFromCart(UserAccessToken, productID);
                console.log(response);
                setProducts((prevProducts) => prevProducts.filter(product => product.id !== productID));
            } catch (error) {
                console.log(error);
            }
        };

        DeleteProductFromCartHandler();
    }, [productID]);

    const HandleDeleteProductButtonClick = (id) => {
        setProductID(id);
    };

    return (
        <React.Fragment>
            <Header />

            <Box mt={7.5} sx={{ minHeight: '100vh'}}>
                <Box display="flex" sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3, padding: 3 }}>
                    {/* User's Cart Products */}
                    <Box sx={{ flex: 1 }}>
                        <FlexSpaceBetween>
                            <Typography variant="h4" gutterBottom fontWeight={500} color="textSecondary">
                                Your Cart
                            </Typography>
                            <ShoppingCartIcon />
                        </FlexSpaceBetween>

                        <Divider sx={{ marginBottom: 2 }} />

                        {products.length === 0 ? (
                            <Typography variant="h6" color="textSecondary">
                                Your cart is empty!
                            </Typography>
                        ) : (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography color="textSecondary">Product</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary">Title</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary">Price</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary">Action</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product, index) => (
                                            <TableRow key={product.id} sx={{ 
                                                background: index % 2 === 0 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.25)'
                                            }}>
                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Avatar src={product.image} />
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{product.title}</TableCell>
                                                <TableCell>${product.price}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => HandleDeleteProductButtonClick(product.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>

                    <Box>
                        <Paper sx={{ padding: 2, width: '420px' }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Box sx={{ width: '120%', aspectRatio: '1/1' }}>
                                    <img style={{ width: '100%' }} src="https://mbank.kg/media/mbusiness/img/m017t0061_march_2522_view02_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_1.png" />
                                </Box>
                                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                    Total Price: $
                                </Typography>

                                <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: 1 }}>
                                    Proceed to Payment
                                </Button>
                                <Button variant="outlined" color="secondary" fullWidth>
                                    Cancel
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Box>

            <Footer />
        </React.Fragment>
    );
}
