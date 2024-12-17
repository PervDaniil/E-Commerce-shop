import {
    Accordion, AccordionDetails, AccordionSummary, Checkbox, 
    Drawer, List, ListItem, Typography, useMediaQuery,
    Divider, Chip, AccordionActions, TextField,
} from "@mui/material";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { ExpandMore as ExpandMoreIcon, Sort as SortIcon } from '@mui/icons-material';
import { fetchProductsFilteredByCategory } from '../utils/fetchProducts';
import FlexColumnCenter from "./layouts/flex/FlexColumnCenter";
import FlexSpaceBetween from "./layouts/flex/FlexSpaceBetween";


export default function Sidebar() {
    const isMobile = useMediaQuery('(min-width: 600px)');

    return (
        <Drawer anchor={!isMobile ? 'top' : 'left'} variant="permanent">
            <List>
                <FlexColumnCenter>
                    <ListItem>
                        <SearchBar />
                    </ListItem>
                    <CategoriesChipsAccordion />
                    <SortingAccordion />
                    <PriceLimitAccordion />
                    <BrandsChoicesAccordion />
                </FlexColumnCenter>
            </List>
        </Drawer>
    )
}


const CategoriesChipsAccordion = () => {
    const [selectedCategoryChip, setSelectedCategoryChip] = useState(null);
    const chipCategories = ['Electronics', 'Clothes', 'Toys', 'HouseTools', 'Nature', 'Food', 'Cosmetics'];

    
    const HandleCategorySelect = (index) => {
        const filterProducts = async () => {
            const products = await fetchProductsFilteredByCategory(chipCategories[index]);
            console.log(products);
        }

        setSelectedCategoryChip(index);
        filterProducts();
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


const SortingAccordion = () => {
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
                                    <FlexSpaceBetween styles={{ width: '100%'}}>
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


const PriceLimitAccordion = () => {
    return (
        <ListItem>
            <Accordion sx={{ flex: 1 }} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Price limit
                </AccordionSummary>
                <AccordionActions>
                    <TextField size="small" label="Min" fullWidth />
                </AccordionActions>
                <AccordionActions>
                    <TextField size="small" label="Max" fullWidth />
                </AccordionActions>
            </Accordion>
        </ListItem>
    )
}


const BrandsChoicesAccordion = () => {
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


const categories = {
    Phones: [
        "Apple",
        "Samsung",
        "Google",
        "OnePlus",
        "Xiaomi"
    ],
    Laptops: [
        "Apple",
        "Dell",
        "HP",
        "Lenovo",
        "Asus"
    ],
    Headphones: [
        "Apple",
        "Sony",
        "Bose",
        "Sennheiser",
        "Beats"
    ]
};