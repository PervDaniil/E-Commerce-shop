import { Box } from "@mui/material";


export default function FlexSpaceEvenly({ children, styles }) {
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            ...styles
        }}>
            { children }
        </Box>
    )
}