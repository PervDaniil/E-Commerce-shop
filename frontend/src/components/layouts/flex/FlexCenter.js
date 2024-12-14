import { Box } from "@mui/material"


export default function FlexCenter({ children, styles }) {
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            ...styles
        }}>
            {children}
        </Box>
    )
}