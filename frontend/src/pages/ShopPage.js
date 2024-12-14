import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import fetchProducts from "../utils/fetchProducts";
import GridLayout from "../components/layouts/grid/GridLayout";
import {
    Button, Card, CardActions, CardContent, CardMedia,
    Typography, Box, Backdrop, CircularProgress, Pagination,
    Alert, Snackbar
} from "@mui/material";
import {
    ShoppingBag as ShoppingBasketIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Language as LanguageIcon,
    ShoppingCart as ShopIcon,
    DarkMode as ThemeIcon,
    Search as SearchIcon,
    Menu as MenuIcon,
} from '@mui/icons-material';


export default function ShopPage() {
    const [requestError, setRequestError] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await fetchProducts();
                setProducts(products);
                setLoading(!loading);
            } catch (error) {
                setRequestError('Failed to fetch!');
            }
        }

        fetchData();
    }, []);


    return (
        <React.Fragment>
            <Sidebar />
            <Box sx={{ ml: '320px' }}>
                <Backdrop open={loading} sx={{ ml: '320px' }}>
                    <CircularProgress color="primary" />
                </Backdrop>
                <Box>
                    <GridLayout styles={{ minHeight: '100vh', width: '100%', gap: '1em 1.5em', p: 2 }}>
                        {products.map(product => (
                            <>
                                <Card sx={{ height: '360px', width: '300px' }}>
                                    <CardMedia sx={{ height: '200px' }}>
                                        <Box component="img" src={product.image} loading="lazy"
                                            sx={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography variant="h6">{product.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                                        <Typography variant="body2" color="primary">{product.price}$</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="outlined" endIcon={<ShopIcon />}>Add to basket</Button>
                                        <Button variant="contained">Buy now</Button>
                                    </CardActions>
                                </Card>
                            </>
                        ))}
                    </GridLayout>
                    <Box display="flex" pt={15} pb={20}>
                        <Pagination count={12} sx={{ margin: 'auto' }} />
                    </Box>
                </Box>
                <Box>
                    <Footer />
                </Box>
            </Box>

            {requestError &&
                <Snackbar autoHideDuration={3000} open={true}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom'}}>
                    <Alert severity="error">{requestError}</Alert>
                </Snackbar>}
        </React.Fragment>
    )
}