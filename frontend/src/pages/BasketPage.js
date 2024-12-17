import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import fetchProducts from "../utils/fetchProducts";
import { ShoppingBag as ShopIcon } from "@mui/icons-material";
import {
    Box, Divider, Typography,
    Card, CardActions, CardMedia, CardContent, Button, Grid, CircularProgress, TextField,
} from "@mui/material";
import FlexSpaceEvenly from "../components/layouts/flex/FlexSpaceEvenly";
import FlexCenter from "../components/layouts/flex/FlexCenter";
import RoundedButton from "../components/custom/RoundedButton";

// Component to display product cards
const ProductCard = ({ product }) => (
    <Card key={product.id} sx={{ width: 300 }}>
        <CardMedia
            component="img"
            height="200"
            image={product.image}
            alt={product.title}
            sx={{ objectFit: 'cover' }}
        />
        <CardContent>
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body2" color="text.secondary">{product.description}</Typography>
            <Typography variant="body2" color="primary">${product.price}</Typography>
        </CardContent>
        <CardActions>
            <Button variant="outlined" startIcon={<ShopIcon />}>Delete</Button>
            <Button variant="contained">Buy Now</Button>
        </CardActions>
    </Card>
);

// Component to display card info (e.g., the mockup)
// Component to display card info (with added chip)
const CardInfoDisplay = ({ cardInfo }) => (
    <Box sx={{
        mt: 2, p: 2, my: 5, borderRadius: 2, boxShadow: 3, display: 'flex',
        backdropFilter: 'blur(45px)', justifyContent: 'center', alignItems: 'center',
        width: '450px', height: '250px', position: 'relative', backgroundColor: '#0c0c0c'
    }}>
        {/* Card Chip */}
        <Box sx={{
            position: 'absolute', top: '20px', left: '20px', width: '40px', height: '30px',
            backgroundColor: 'gold', borderRadius: '5px', boxShadow: 'inset 0px 0px 8px rgba(0,0,0,0.2)'
        }}>
            {/* Use a simple text to represent the chip, or you could use an image */}
            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '8px' }}></Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', color: 'white' }}>
            <Typography variant="h6" sx={{ ml: 7.5 }}>
                4512 9349 2211 {cardInfo.cardNumber ? cardInfo.cardNumber.slice(-4) : '1234'}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <Typography>EXP</Typography>
                <Typography>{cardInfo.expiration || 'MM/YY'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <Typography>Cardholder</Typography>
                <Typography>{cardInfo.cardholder || 'John Doe'}</Typography>
            </Box>
        </Box>
    </Box>
);


// Custom hook for managing form state
const useCardInfo = () => {
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "", expiration: "", cvv: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return { cardInfo, handleInputChange };
};

// Custom hook for fetching products
const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await fetchProducts();
                setProducts(products);
            } catch (error) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { products, loading, error };
};

export default function BasketPage() {
    const { products, loading, error } = useFetchProducts();
    const { cardInfo, handleInputChange } = useCardInfo();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting payment with card info:", cardInfo);
    };

    if (loading) {
        return (
            <FlexCenter>
                <CircularProgress />
            </FlexCenter>
        );
    }

    if (error) {
        return (
            <FlexCenter>
                <Typography color="error">{error}</Typography>
            </FlexCenter>
        );
    }

    return (
        <>
            <Header />
            <Box sx={{ mt: 10, display: 'grid', gridTemplateColumns: '1fr 500px', gap: 3, px: 2 }}>
                <Box>
                    <FlexSpaceEvenly styles={{ gap: '1em', flexWrap: 'wrap' }}>
                        {products.length === 0 ? (
                            <Typography>No products in the cart</Typography>
                        ) : (
                            products.map((product) => <ProductCard key={product.id} product={product} />)
                        )}
                    </FlexSpaceEvenly>
                </Box>
                <Box sx={{ p: 2, background: theme => theme.palette.background.paper }}>
                    <Typography variant="h5" gutterBottom>Payment Info</Typography>
                    <Divider />
                    <FlexCenter>
                        <CardInfoDisplay cardInfo={cardInfo} />
                    </FlexCenter>

                    <Box sx={{ minHeight: '75vh', mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Card Number"
                                        name="cardNumber"
                                        variant="outlined"
                                        fullWidth
                                        value={cardInfo.cardNumber}
                                        onChange={handleInputChange}
                                        inputProps={{ maxLength: 16 }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Expiration Date"
                                        name="expiration"
                                        variant="outlined"
                                        fullWidth
                                        value={cardInfo.expiration}
                                        onChange={handleInputChange}
                                        inputProps={{ maxLength: 5 }} // Format as MM/YY
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="CVV"
                                        name="cvv"
                                        variant="outlined"
                                        fullWidth
                                        value={cardInfo.cvv}
                                        onChange={handleInputChange}
                                        inputProps={{ maxLength: 3 }}
                                    />
                                </Grid>
                            </Grid>
                            <RoundedButton variant="contained" size="large" sx={{ width: '100%', mt: 3 }} type="submit">
                                Pay Now
                            </RoundedButton>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
