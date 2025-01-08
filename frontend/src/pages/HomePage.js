import React from 'react';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Typography, Chip } from '@mui/material';
import RoundedButton from '../components/custom/RoundedButton';
import FlexColumnCenter from '../components/layouts/flex/FlexColumnCenter';
import { Payment as PaymentIcon, ShoppingCart as ShoppingCartIcon} from '@mui/icons-material';


export default function HomePage() {
    return (
        <React.Fragment>
            <Header />
            <Box className="HeadSection" sx={{ py: 7.5 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'linear-gradient(90deg, #0a0a0a, rgb(67, 66, 64))' }}>
                    <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}>

                        <FlexColumnCenter styles={{ height: '100vh', p: 5, pl: 15 }}>
                            <Box sx={{ mb: 10 }}>
                                <Typography variant="h2" fontWeight={600} sx={{ background: 'linear-gradient(120deg, #555, #fff)', '-webkit-background-clip' : 'text', color: 'transparent' }}>
                                    Samsung Galaxy S24 Ultra
                                </Typography>
                                <Box sx={{ mt: 3, gap: '0 1em', display: 'flex' }}>
                                    {['Price 699$', '2 years of warranty', 'Samsung', 'Phones', 'Cash back 9.2%'].map(chipLabel => (
                                        <Chip label={chipLabel} />
                                    ))}
                                </Box>
                                <Typography variant="body1" color="textSecondary" sx={{ mt: 5, mb: 5, px: 2 }}>
                                    The Samsung Galaxy S24 Ultra is a flagship smartphone featuring a sleek design, a stunning 6.8-inch Dynamic AMOLED display, and powerful hardware.
                                </Typography>
                                <Box>
                                    <RoundedButton variant="contained" size="large" endIcon={<PaymentIcon />}>
                                        Buy now
                                    </RoundedButton>
                                    <RoundedButton variant="contained" size="large" endIcon={<ShoppingCartIcon />} sx={{ ml: 5 }}>
                                        Add to basket
                                    </RoundedButton>
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