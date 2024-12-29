import React from 'react';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Typography, Button, Chip } from '@mui/material';
import FlexCenter from '../components/layouts/flex/FlexCenter';
import FlexColumnCenter from '../components/layouts/flex/FlexColumnCenter';
import { Payment as PaymentIcon, Add as AddIcon } from '@mui/icons-material';


export default function HomePage() {
    return (
        <React.Fragment>
            <Header />
            <Box className="HeadSection" sx={{ py: 7.5 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'linear-gradient(45deg, black, rgb(67, 66, 64))' }}>
                    <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}>

                        <FlexColumnCenter styles={{ height: '100vh', p: 10, pl: 15 }}>
                            <Box sx={{ mb: 10 }}>
                                <Typography variant="h2" fontWeight={400}>
                                    Samsung Galaxy S24 Ultra
                                </Typography>
                                <Box sx={{ mt: 2, gap: '0 1em', display: 'flex' }}>
                                    {['Price 699$', '2 years of warranty', 'Samsung', 'Phones', 'Cash back 9.2%'].map(chipLabel => (
                                        <Chip color="primary" label={chipLabel} />
                                    ))}
                                </Box>
                                <Typography variant="body1" color="textSecondary" sx={{ mt: 5, mb: 5, px: 2 }}>
                                    The Samsung Galaxy S24 Ultra is a flagship smartphone featuring a sleek design, a stunning 6.8-inch Dynamic AMOLED display, and powerful hardware.
                                </Typography>
                                <Box>
                                    <Button variant="contained" size="large" endIcon={<PaymentIcon />}>Buy now</Button>
                                    <Button variant="contained" size="large" endIcon={<AddIcon />} sx={{ ml: 5 }}>Add to basket</Button>
                                </Box>
                            </Box>
                        </FlexColumnCenter>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -200}} animate={{opacity: 1, x: 0}} transition={{ duration: 1}}>
                        <Box styles={{ height: '100vh', overflow: 'hidden' }}>
                            <Box component="img"
                                src="https://bits-mart.com/cdn/shop/files/samsung-galaxy-s24-ultra-titanium-black-4.png?v=1708563416&width=1946"
                                sx={{ height: '100vh', filter: 'drop-shadow(24px 32px 128px black)' }} />
                        </Box>
                    </motion.div>
                </Box>
            </Box>
            <Footer />
        </React.Fragment>
    )
}