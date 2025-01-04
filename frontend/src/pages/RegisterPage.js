import redirect from "../utils/redirect";
import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import FlexCenter from "../components/layouts/flex/FlexCenter";
import FlexColumnCenter from "../components/layouts/flex/FlexColumnCenter";
import { CheckBox, Home as HomeIcon, RemoveRedEye as ShowPasswordIcon } from "@mui/icons-material";
import { Box, Button, TextField, Paper, Typography, Fab, IconButton, Tooltip, FormControlLabel, InputAdornment } from "@mui/material";



export default function RegisterPage() {
    const { Login } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        'username': '',
        'password': '',
    });


    const HandleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    const HandleInput = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }


    const HandleFormSubmit = (event) => {
        event.preventDefault();

        const PostFormData = async () => {
            const response = await fetch('/api/v3/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseBody = await response.json();
            Login(responseBody);
            redirect('/');
        }

        PostFormData();
    }

    return (
        <React.Fragment>
            <FlexCenter styles={{ height: '100vh' }}>
                <Paper sx={{ boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.25)' }}>
                    <Box component="form" p={3.5} onSubmit={HandleFormSubmit}>
                        <Typography variant="h3" fontWeight={100} gutterBottom>Sing up</Typography>
                        <Typography variant="body2" fontWeight={100}>All fields are required</Typography>
                        <FlexColumnCenter styles={{ width: '380px', gap: '1em 0', mt: 5, mb: 12.5 }}>
                            <TextField label="Username" fullWidth focused name="username" onChange={HandleInput} />
                            <TextField
                                onChange={HandleInput}
                                type={showPassword ? 'text' : 'password'}
                                label="Password" fullWidth focused name="password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton onClick={HandleShowPassword}>
                                                <ShowPasswordIcon color={showPassword ? 'primary' : 'secondary'} />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} />
                            <TextField
                                onChange={HandleInput}
                                type={showPassword ? 'text' : 'password'}
                                label="Confirm password" fullWidth focused name="confirmed_password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton onClick={HandleShowPassword}>
                                                <ShowPasswordIcon color={showPassword ? 'primary' : 'secondary'} />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} />
                            <Box sx={{ width: '90%' }} display="flex">
                                <FormControlLabel label={
                                    <Typography variant="body2" color="textSecondary" ml={1}>Single time log in?</Typography>}
                                    control={<CheckBox color="primary" />} />
                            </Box>
                        </FlexColumnCenter>
                        <Button size="large" type="submit" variant="contained" fullWidth>Submit</Button>
                    </Box>
                </Paper>
            </FlexCenter>
            <Tooltip title="Back to home">
                <Fab sx={{ position: 'absolute', bottom: '2em', left: '2em' }} color="primary">
                    <IconButton href="/">
                        <HomeIcon />
                    </IconButton>
                </Fab>
            </Tooltip>
        </React.Fragment>
    )
}