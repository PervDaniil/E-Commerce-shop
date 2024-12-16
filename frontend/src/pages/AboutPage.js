import { Box, Typography, } from "@mui/material";
import Header from "../components/Header";
import { motion } from 'motion/react';
import RoundedButton from "../components/custom/RoundedButton";


export default function AboutPage() {
    return (
        <Box>
            <Header />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <motion.div initial={{ opacity: 0, x: -250 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75 }}>
                    <Box sx={{ p: 7.5, pl: 10, pt: 15, display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <Box flex="1">
                            <Typography variant="h2" gutterBottom>About us</Typography>
                            <Typography color="textSecondary">Welcome to E-WSKG! At E-WSKG, we are passionate about bringing you the best shopping experience. Our mission is to provide high-quality products that meet the needs and desires of our customers, all in one easy-to-navigate online store. Whether you’re looking for the latest fashion trends, unique gadgets, or home essentials, we’ve got you covered.</Typography>
                        </Box>
                        <Box>
                            <RoundedButton variant="contained" size="large">Get started</RoundedButton>
                            <RoundedButton variant="contained" size="large">Back to home</RoundedButton>
                        </Box>
                    </Box>
                </motion.div>
            </Box>
        </Box>
    )
}