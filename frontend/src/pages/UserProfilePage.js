import Header from "../components/Header";
import Footer from '../components/Footer';
import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Box, Typography, Avatar, Button, Divider } from '@mui/material';


export default function UserProfilePage() {
    const { user, UserAccessJWT } = useContext(AuthContext);

    return (
        <React.Fragment>
            <Header />

            <Box sx={{ maxWidth: 1200, margin: '4.5em auto', padding: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                    <Avatar
                        alt="Profile"
                        sx={{ width: 120, height: 120, marginRight: 3 }}
                    />
                    <Box>
                        <Typography variant="h5" component="h2">{user.username}</Typography>
                        <Typography variant="body1" color="textSecondary">@{user.username}</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 400, mt: 1 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet.
                        </Typography>
                        <Box sx={{ marginTop: 2 }}>
                            <Button variant="outlined" color="primary" sx={{ marginRight: 1 }}>
                                Follow
                            </Button>
                            <Button variant="outlined" color="secondary">
                                Message
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <Typography variant="body1" color="textSecondary">
                        <strong>234</strong> Posts
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        <strong>1.5K</strong> Followers
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        <strong>300</strong> Following
                    </Typography>
                </Box>

                <Divider sx={{ marginBottom: 3 }} />
                <Footer />
            </Box>
        </React.Fragment>
    )
}


