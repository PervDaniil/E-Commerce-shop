import { AppBar, Box, IconButton, Toolbar, Typography, Menu, MenuList, MenuItem, Divider, Avatar, Badge } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import FlexCenter from "./layouts/flex/FlexCenter";
import { useContext, useState } from "react";
import {
    ShoppingBag as ShoppingBasketIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Language as LanguageIcon,
    ShoppingCart as ShopIcon,
    DarkMode as ThemeIcon,
    Search as SearchIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
} from '@mui/icons-material';
import redirect from "../utils/redirect";


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
                        Logo
                    </Typography>
                </Box>
                <FlexCenter styles={{ flex: 1, gap: '0 2em' }}>
                    {links.map(option => (
                        <Typography variant="body1" color="textSecondary" component="a"
                            href={option.href} sx={{ textDecoration: 'none' }}>
                            {option.title}
                        </Typography>
                    ))}
                </FlexCenter>
                <Box className="basket">
                    <IconButton color="secondary" href="/basket">
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
                                    user ? window.location.href = "/profile" : window.location.href = "/login"
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
                                    <MenuItem key={index} onClick={() =>
                                        item.href !== undefined ? redirect(item.href) : HandleMenuClose()}
                                        sx={{ display: 'flex', gap: '0 1em' }}>
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
    { option: 'Search', icon: <SearchIcon color="secondary" /> },
    { option: 'Shop', icon: <ShopIcon color="secondary" />, href: '/shop' },
    { option: 'Basket', icon: <ShoppingBasketIcon color="secondary" />, href: '/basket' },
    { option: 'Theme', icon: <ThemeIcon color="secondary" /> },
    { option: 'Logout', icon: <LogoutIcon color="secondary" /> },
    { option: 'Settings', icon: <SettingsIcon color="secondary" /> },
    { option: 'Language', icon: <LanguageIcon color="secondary" /> },
    { option: 'Notifications', icon: <NotificationsIcon color="secondary" /> }
]

const links = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Products', href: '/products' },
    { title: 'Shop', href: 'shop/' },
    { title: 'Contacts', href: '/contacts' },
    { title: 'FAQ', href: '/faq' },
]