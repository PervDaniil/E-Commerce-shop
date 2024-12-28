import redirect from "../utils/redirect";
import Footer from "../components/Footer";
import ShopSidebar from "../components/ShopSidebar";
import { AuthContext } from "../components/AuthProvider";
import GridLayout from "../components/layouts/grid/GridLayout";
import React, { useContext, useEffect, useState } from "react";
import fetchProducts, { addProductToCart } from "../utils/fetchProducts";

import {
    Button, Card, CardActions, CardContent, CardMedia,
    Typography, Box, Backdrop, CircularProgress, Pagination,
    Alert, Snackbar, SpeedDial, SpeedDialAction
} from "@mui/material";

import {
    ShoppingCart as ShopIcon,
    Search as SearchIcon,
    Home as HomeIcon,
} from '@mui/icons-material';
import SwiperComponent from "../components/Swiper";


export default function ShopPage() {
    const [loading, setLoading] = useState(true);


    return (
        <>
            <ShopSidebar />
            <Box ml="320px">
                <TopProductsSection />
                <CardsGridLayout
                    loading={loading}
                    setLoading={setLoading} />
                <Footer />
            </Box>
            <FAB />
        </>
    )
}


const CardsGridLayout = ({ loading, setLoading }) => {
    const { UserAccessJWT } = useContext(AuthContext);
    const [productAdded, setProductAdded] = useState(false);
    const [requestError, setRequestError] = useState(null);
    const [productID, setProductID] = useState(null);
    const [products, setProducts] = useState([]);


    const HandleAddToCartClick = (productID) => {
        setProductID(productID);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await fetchProducts();
                setProducts(products.results);
                setLoading(!loading);
            } catch (error) {
                setRequestError('Failed to fetch!');

                setTimeout(() => {
                    setRequestError(null);
                }, 3000);
            }
        }

        fetchData();
    }, []);


    useEffect(() => {
        const productAddingFetch = async () => {
            const UserAccessToken = UserAccessJWT();
            const response = await addProductToCart(UserAccessToken, productID);
            console.log(response);
        }

        if (productID) {
            productAddingFetch();
            setProductAdded(true);

            setTimeout(() => {
                setProductAdded(false);
            }, 3000);
        }
    }, [productID]);


    return (
        <>
            <Backdrop open={loading} sx={{ ml: '320px' }}>
                <CircularProgress color="primary" />
            </Backdrop>
            <Box>
                <GridLayout styles={{ minHeight: '100vh', width: '100%', gap: '1em 1.5em', p: 2 }}>
                    {products.map(product => (
                        <>
                            <Card sx={{ height: '365px', width: '300px' }}>
                                <CardMedia sx={{ height: '200px' }}>
                                    <Box component="img" src={product.image} loading="lazy"
                                        sx={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />
                                </CardMedia>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom whiteSpace='nowrap'
                                        textOverflow='ellipsis' overflow='hidden'>
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary"
                                        whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                        {product.description}
                                    </Typography>
                                    <Typography variant="body2" color="primary">{product.price}$</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="outlined"
                                        endIcon={<ShopIcon />}
                                        onClick={() => HandleAddToCartClick(product.id)}>
                                        Add to basket
                                    </Button>
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
            {requestError &&
                <Snackbar
                    open={true}
                    autoHideDuration={3000}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Alert severity="error">{requestError}</Alert>
                </Snackbar>}

            {productAdded &&
                <Snackbar
                    open={true}
                    autoHideDuration={1200}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <Alert severity="success">Product has added successfully!</Alert>
                </Snackbar>}
        </>
    )
}


const FAB = () => {
    return (
        <Box sx={{ position: 'sticky', right: '1em', bottom: '1em' }}>
            <SpeedDial
                ariaLabel="Home"
                icon={<HomeIcon />}
                sx={{ position: 'absolute', right: '1em', bottom: '1em' }}>
                <SpeedDialAction icon={<ShopIcon />}
                    onClick={() => redirect('/basket')} />
                <SpeedDialAction icon={<SearchIcon />} />
                <SpeedDialAction icon={<HomeIcon />}
                    onClick={() => redirect('/')} />
            </SpeedDial>
        </Box>
    )
}


const TopProductsSection = () => {
    return (
        <Box sx={{ my: 10 }}>
            <SwiperComponent>

            </SwiperComponent>
        </Box>
    )
}