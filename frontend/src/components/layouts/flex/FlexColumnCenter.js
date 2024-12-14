import { Box } from "@mui/material"


export default function FlexColumnCenter({ children, styles }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            ...styles
        }}>
            {children}
        </Box>
    )
}