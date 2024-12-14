import { Box, IconButton, Typography } from "@mui/material";
import FlexSpaceEvenly from "./layouts/flex/FlexSpaceEvenly";
import FlexCenter from "./layouts/flex/FlexCenter";
import {
    Telegram as TelegramIcon,
    Instagram as InstagramIcon,
    WhatsApp as WhatsAppIcon,
    YouTube as YouTubeIcon,
    GitHub as GitHubIcon,
} from '@mui/icons-material';


export default function Footer() {
    return (
        <Box component="footer">
            <Box className="footerWrapper" sx={{ py: 10 }}>
                <FlexSpaceEvenly>
                    <Box>
                    <Typography variant="h5">Company Info</Typography>
                        <Typography variant="body1" color="textSecondary">E-WSKG</Typography>
                        <Typography variant="body1" color="textSecondary">Bishkek Kyrgyzstan</Typography>
                        <Typography variant="body1" color="textSecondary">Phone +996 999 999 999</Typography> 
                    </Box>
                    <Box>
                        <Typography variant="h5">About us</Typography>
                        <Typography variant="body1" color="textSecondary">FAQ</Typography>
                        <Typography variant="body1" color="textSecondary">Services</Typography>
                        <Typography variant="body1" color="textSecondary">Products</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">Quick links</Typography>
                        <Typography variant="body1" color="textSecondary">Privacy Policy</Typography>
                        <Typography variant="body1" color="textSecondary">Terms of Serice</Typography>
                        <Typography variant="body1" color="textSecondary">Terms & Conditions</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">Feedback</Typography>
                        <Typography variant="body1" color="textSecondary">Submit form</Typography>
                        <Typography variant="body1" color="textSecondary">Leave a review</Typography>
                        <Typography variant="body1" color="textSecondary">Share your feedback</Typography>
                    </Box>
                </FlexSpaceEvenly>
                <FlexCenter styles={{ gap: '0em 3em', pt: 15, pb: 10 }}>
                        <IconButton>
                            <YouTubeIcon color="secondary"/>
                        </IconButton>
                        <IconButton>
                            <TelegramIcon color="secondary" />
                        </IconButton>
                        <IconButton>
                            <GitHubIcon color="secondary" />
                        </IconButton>
                        <IconButton>
                            <WhatsAppIcon color="secondary" />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon color="secondary" />
                        </IconButton>
                </FlexCenter>
                <FlexCenter>
                    <Typography variant="body1" color="textSecondary">&copy; 2024 E-WSKG. All Rights Reserved</Typography>
                </FlexCenter>
            </Box>
        </Box>
    )
}