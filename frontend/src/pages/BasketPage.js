import { Box, Button, Typography, IconButton, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Drawer, styled, SpeedDial, SpeedDialAction } from "@mui/material";
import { deleteProductFromCart, fetchUserCartProducts } from "../utils/fetchProducts";
import FlexSpaceBetween from "../components/layouts/flex/FlexSpaceBetween";
import FlexCenter from "../components/layouts/flex/FlexCenter";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
    ViewColumn as SwapToGridIcon,
    Payment as DebitCardIcon,
    Delete as DeleteIcon,
    MoreHoriz as MoreIcon,
    Home as HomeIcon,
    Add as AddIcon,
} from "@mui/icons-material";


export default function BasketPage() {
    return (
        <React.Fragment>
            <Header />

            <Box mt={7.5} sx={{ minHeight: '100vh' }}>
                <Box display="flex">
                    <Box flex="1" padding={3}>
                        <CartProductsLayout />
                    </Box>
                    <Box sx={{ width: '420px' }}>
                        <PaymentInfoLayout />
                    </Box>
                </Box>
            </Box>

            <FAB />
            <Footer />
        </React.Fragment>
    );
}


const CartProductsLayout = () => {
    const { UserAccessJWT } = useContext(AuthContext);
    const [gridLayout, setGridLayout] = useState(false);
    const [productID, setProductID] = useState(null);
    const [products, setProducts] = useState([]);


    const HandleChangeGridLayout = () => {
        setGridLayout(prevState => !prevState);
    }


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


    const TableHeaders = ['Product', 'Title', 'Price', 'Action']


    return (
        <>
            <FlexSpaceBetween>
                <Typography variant="h4" gutterBottom fontWeight={500} color="textSecondary">
                    Cart
                </Typography>
                <Box>
                    <IconButton>
                        <MoreIcon color="secondary" />
                    </IconButton>
                    <IconButton onClick={HandleChangeGridLayout}>
                        <SwapToGridIcon color="secondary" />
                    </IconButton>
                </Box>
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
                                {TableHeaders.map(headerText => (
                                    <TableCell>
                                        <Typography color="textSecondary">{headerText}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={product.id} sx={{
                                    background: index % 2 === 0 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.25)'
                                }}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Avatar src={product.image} sx={{ height: '2.5em', width: '2.5em' }} />
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
        </>
    )
}


const PaymentInfoLayout = () => {
    const TextWithLeftUnderline = styled(Typography)(({ theme }) => {
        return {
            paddingLeft: '0.75em',
            borderLeft: `0.25em solid ${theme.palette.info.main}`,
        }
    })

    return (
        <Drawer anchor="right" variant="permanent" sx={{
            '& .MuiDrawer-paper': {
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
                zIndex: 1,
            },
        }}>
            <Paper sx={{ mt: 10, mr: 1, padding: 2, width: '420px' }}>
                <Box display="flex" flexDirection="column" alignItems="center" overflow="hidden">
                    <FlexCenter styles={{
                        width: '100%', aspectRatio: '1/1', borderRadius: '12px 172px',
                        background: 'linear-gradient(45deg, #0f0f0f, #242424)', boxShadow: 'inset 0px 0px 24px #0f0f0f'
                    }}>
                        <img style={{ width: '120%', filter: 'drop-shadow(0px 10px 12px black)' }}
                            src="https://mbank.kg/media/mbusiness/img/m017t0061_march_2522_view02_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_1.png" />
                    </FlexCenter>

                    <Box width="100%">
                        <FlexSpaceBetween>
                            <Box flex="1" mt={1}>
                                <TextWithLeftUnderline variant="body2" mt={2} gutterBottom color="textSecondary">
                                    Card balance: 245.82$
                                </TextWithLeftUnderline>
                                <TextWithLeftUnderline variant="body2" mt={2} gutterBottom color="textSecondary">
                                    Card Provider: MBank
                                </TextWithLeftUnderline>
                                <TextWithLeftUnderline variant="body2" mt={2} gutterBottom color="textSecondary">
                                    Card Owner: DjangoDev
                                </TextWithLeftUnderline>
                            </Box>
                            <Box flex="1" display="flex">
                                <img src="https://play-lh.googleusercontent.com/44bsXoO-WFVICrm_licbHOWJrmkQiT8WzvopporQ3hH2F_qVT3poSRXLABpHKKg4kYw=s256"
                                    style={{ margin: 'auto', marginTop: '1em', width: '50%', objectFit: 'cover', borderRadius: '12px' }} />
                            </Box>
                        </FlexSpaceBetween>
                    </Box>

                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 5 }} endIcon={<DebitCardIcon />}>
                        Proceed to Payment
                    </Button>
                    <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }}>
                        Cancel
                    </Button>
                </Box>
            </Paper>
        </Drawer>
    )
}

const FAB = () => {
    return (
        <SpeedDial ariaLabel="Home" icon={<HomeIcon />} sx={{ position: 'absolute', bottom: 15, left: 15 }}>
            <SpeedDialAction icon={<AddIcon />} />
            <SpeedDialAction icon={<HomeIcon />} />
        </SpeedDial>
    )
}