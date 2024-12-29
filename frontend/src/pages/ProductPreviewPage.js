import { Box, Button, Typography, Divider, Paper, Drawer, styled } from "@mui/material";
import FlexSpaceBetween from "../components/layouts/flex/FlexSpaceBetween";
import FlexCenter from "../components/layouts/flex/FlexCenter";
import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
    Payment as DebitCardIcon,
} from "@mui/icons-material";


export default function ProductPreviewPage() {
    return (
        <React.Fragment>
            <Header />

            <Box mt={7.5} sx={{ minHeight: '100vh' }}>
                <Box display="flex">
                    <Box flex="1" padding={3}>
                        <CartProductLayout />
                    </Box>
                    <Box sx={{ width: '420px' }}>
                        <PaymentInfoLayout />
                    </Box>
                </Box>
            </Box>

            <Footer />
        </React.Fragment>
    );
}


const CartProductLayout = () => {
    return (
        <>
            <Typography variant="h4" gutterBottom fontWeight={500} color="textSecondary">
                Product name
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <FlexCenter styles={{ height: '70%', px: 2}}>
                <img src="https://picsum.photos/1200/800/" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '12px'}}/>
            </FlexCenter>
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
                        Add to basket
                    </Button>
                </Box>
            </Paper>
        </Drawer>
    )
}
