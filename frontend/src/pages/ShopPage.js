import redirect from "../utils/redirect";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../providers/AuthProvider";
import GridLayout from "../components/layouts/grid/GridLayout";
import React, { useContext, useEffect, useState } from "react";
import FlexSpaceEvenly from "../components/layouts/flex/FlexSpaceEvenly";
import FlexSpaceBetween from "../components/layouts/flex/FlexSpaceBetween";
import { addProductToCart, fetchFilteredProducts } from "../utils/fetchProducts";

import {
    Button, Card, CardActions, CardContent, CardMedia,
    Typography, Box, Backdrop, CircularProgress, Pagination,
    Accordion, AccordionDetails, AccordionSummary, Checkbox,
    ListItem, Divider, Chip, AccordionActions, TextField,
    Alert, Snackbar, SpeedDial, SpeedDialAction, List,
} from "@mui/material";

import {
    ExpandMore as ExpandMoreIcon,
    ShoppingCart as ShopIcon,
    Search as SearchIcon,
    Home as HomeIcon,
    Sort as SortIcon
} from '@mui/icons-material';


export default function ShopPage() {
    const [filter, setFilter] = useState({
        'search_title': '',
        'max_price': '',
        'min_price': '',
        'category': '',
        'brand': '',
    });


    const HandleFilterOptionChange = (option) => {
        setFilter(prev => ({
            ...prev,
            [option.key]: option.value
        }))
        console.log(filter)
    }

    return (
        <>
            <ShopSidebar setFilter={HandleFilterOptionChange} />
            <Box ml="320px">
                <CardsGridLayout productsFilterOptions={filter} />
                <Footer />
            </Box>
            <FAB />
        </>
    )
}


const ShopSidebar = ({ setFilter }) => {
    return (
        <Sidebar>
            <Searchbar setSearchFilter={setFilter} />
            <CategoriesChipsAccordion setFilterCategory={setFilter} />
            <SortingAccordion setFilterMore={setFilter} />
            <PriceLimitAccordion setPriceLimitFilter={setFilter} />
            <BrandsChoicesAccordion setBrandFilter={setFilter} />
        </Sidebar>
    )
}


const Searchbar = ({ setSearchFilter }) => {
    const HandleInput = (event) => {
        const { value } = event.target;
        setSearchFilter({
            key: 'search_title',
            value, value,
        })
    }

    return (
        <SearchBar onChange={HandleInput} styles={{ px: 1, mt: 1, mb: 2 }} />
    )
}


const CategoriesChipsAccordion = ({ setFilterCategory }) => {
    const chipCategories = ['Electronics', 'Clothes', 'Toys', 'HouseTools', 'Furniture', 'Food', 'Cosmetics', 'Other'];
    const [selectedCategoryChip, setSelectedCategoryChip] = useState(null);


    const HandleCategorySelect = (index) => {
        setSelectedCategoryChip(index);
        setFilterCategory({
            key: 'category',
            value: chipCategories[index],
        })
    }

    return (
        <ListItem sx={{ width: '320px' }}>
            <Accordion sx={{ flex: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>Categories</AccordionSummary>
                <AccordionDetails sx={{ gap: '0.5em', display: 'flex', flexWrap: 'wrap' }}>
                    {chipCategories.map((category, index) => (
                        <Chip label={category} key={index} color={selectedCategoryChip === index ? 'primary' : 'default'}
                            onClick={() => HandleCategorySelect(index)} />
                    ))}
                </AccordionDetails>
            </Accordion>
        </ListItem>
    )

}


const SortingAccordion = ({ setFilterMore }) => {
    return (
        <ListItem sx={{ width: '320px' }}>
            <Accordion sx={{ flex: 1 }}>
                <AccordionSummary expandIcon={<SortIcon />}>Sorting</AccordionSummary>
                <AccordionDetails>
                    <List>
                        {['Date', 'Price', 'Rating', 'Purchases',].map((label, index) => (
                            <>
                                <Divider />
                                <ListItem key={index}>
                                    <FlexSpaceBetween styles={{ width: '100%' }}>
                                        <Typography variant="body2" color="textSecondary">{label}</Typography>
                                        <Checkbox key={index} />
                                    </FlexSpaceBetween>
                                </ListItem>
                            </>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </ListItem>
    )
}


const PriceLimitAccordion = ({ setPriceLimitFilter }) => {
    const HandlePriceLimitChange = (event) => {
        const {name, value} = event.target;

        setPriceLimitFilter({
            key: name,
            value: value,
        })
    }

    const priceField = (name, label) => {
        return (
            <TextField type="number" name={name} size="small" label={label} fullWidth onChange={HandlePriceLimitChange} />
        )
    }

    return (
        <ListItem>
            <Accordion sx={{ flex: 1 }} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Price limit
                </AccordionSummary>
                <AccordionActions>
                    {priceField('min_price', 'Min')}
                </AccordionActions>
                <AccordionActions>
                    {priceField('max_price', 'Max')}
                </AccordionActions>
            </Accordion>
        </ListItem>
    )
}


const BrandsChoicesAccordion = ({ setBrandFilter }) => {
    return (
        <ListItem>
            <Accordion defaultExpanded sx={{ flex: 1 }}>
                <AccordionSummary>
                    Brands
                </AccordionSummary>
                <List>
                    {Object.keys(categories).map((category) => (
                        <ListItem key={category}>
                            <Accordion sx={{ flex: 1 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{category}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        {categories[category].map((brand, index) => (
                                            <ListItem key={index}>
                                                <Typography color="textSecondary">{brand}</Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </ListItem>
                    ))}
                </List>
            </Accordion>
        </ListItem>
    )
}


const CardsGridLayout = ({ productsFilterOptions }) => {
    const { UserAccessJWT } = useContext(AuthContext);
    const [productAdded, setProductAdded] = useState(false);
    const [requestError, setRequestError] = useState(null);
    const [productID, setProductID] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);


    const HandleAddToCartClick = (productID) => {
        setProductID(productID);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const products = await fetchFilteredProducts(productsFilterOptions);
                setProducts(products);
                setLoading(false);
            } catch (error) {
                setRequestError('Failed to fetch!');

                setTimeout(() => {
                    setRequestError(null);
                }, 3000);
            }
        }

        fetchData();
    }, [productsFilterOptions]);


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
            <Backdrop open={isLoading} sx={{ ml: '320px'}}>
                <CircularProgress />
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
                                    <FlexSpaceEvenly styles={{ width: '100%', gap: '0 1em'}}>
                                        <Button
                                            variant="outlined"
                                            endIcon={<ShopIcon />}
                                            onClick={() => HandleAddToCartClick(product.id)}>
                                            Add to basket
                                        </Button>
                                        <Button variant="contained">Buy now</Button>
                                    </FlexSpaceEvenly>
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


const categories = {
    Phones: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
    Laptops: ["Apple", "Dell", "HP", "Lenovo", "Asus"],
    Headphones: ["Apple", "Sony", "Bose", "Sennheiser", "Beats"]
};