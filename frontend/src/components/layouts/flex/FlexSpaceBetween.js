import { Box } from "@mui/material"


export default function FlexSpaceBetween({ children, styles }) {
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...styles
        }}>
            {children}
        </Box>
    )
}