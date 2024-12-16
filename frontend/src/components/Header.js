import { AppBar, Box, IconButton, Toolbar, Typography, Menu, MenuList, MenuItem, Divider, Avatar, Badge } from "@mui/material";
import FlexCenter from "./layouts/flex/FlexCenter";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import {
    ShoppingBag as ShoppingBasketIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Language as LanguageIcon,
    ShoppingCart as ShopIcon,
    DarkMode as ThemeIcon,
    Search as SearchIcon,
    Menu as MenuIcon,
} from '@mui/icons-material';


export default function Header() {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const { user } = useContext(AuthContext);


    const HandleMenuAnchor = (event) => {
        setMenuAnchor(event.currentTarget);
    }

    const HandleMenuClose = () => {
        setMenuAnchor(null);
    }


    return (
        <AppBar>
            <Toolbar>
                <Box className="logo">
                    <Typography variant="h5" fontFamily="Azonix">
                        E-WSKG
                    </Typography>
                </Box>
                <FlexCenter styles={{ flex: 1, gap: '0 2em' }}>
                    {['Home', 'About', 'Products', 'Shop', 'Contacts', 'FAQ'].map(link => (
                        <Typography variant="body1" color="textSecondary" component="a" href={link.toLowerCase()} sx={{ textDecoration: 'none' }}>
                            {link}
                        </Typography>
                    ))}
                </FlexCenter>
                <Box className="basket">
                    <IconButton color="secondary">
                        <ShopIcon />
                    </IconButton>
                    <IconButton onClick={HandleMenuAnchor}>
                        <MenuIcon />
                    </IconButton>
                    <Menu open={Boolean(menuAnchor)} anchorEl={menuAnchor}
                        onClose={HandleMenuClose} disableScrollLock
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        sx={{ zIndex: '1000' }}>
                        <MenuList>
                            <MenuItem sx={{ display: 'flex', gap: '0 1em' }} 
                                onClick={() => {
                                    user ? window.location.href = "profile/" : window.location.href =  "login/"
                                }}>
                                <Badge color={user ? 'success' : 'error'} variant="dot" overlap="circular">
                                    <Avatar />
                                </Badge>
                                <Typography>
                                    {user ? (<>{user.username}</>) : (<>Sign in</>)}
                                </Typography>
                            </MenuItem>
                            {MenuOptions.map((item, index) => (
                                <>
                                    <Divider />
                                    <MenuItem key={index} onClick={HandleMenuClose} sx={{ display: 'flex', gap: '0 1em' }}>
                                        {item.icon}
                                        <Typography component="div" variant="body1" >
                                            {item.option}
                                        </Typography>
                                    </MenuItem>
                                </>
                            ))}
                        </MenuList>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}


const MenuOptions = [
    { option: 'Search', icon: <SearchIcon color="secondary"/> },
    { option: 'Shop', icon: <ShopIcon color="secondary"/>},
    { option: 'Basket', icon: <ShoppingBasketIcon color="secondary"/> },
    { option: 'Theme', icon: <ThemeIcon color="secondary"/> },
    { option: 'Settings', icon: <SettingsIcon color="secondary"/> },
    { option: 'Language', icon: <LanguageIcon color="secondary"/> },
    { option: 'Notifications', icon: <NotificationsIcon color="secondary"/> }
]