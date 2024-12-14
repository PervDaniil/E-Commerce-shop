import { Box } from "@mui/material"


export default function GridLayout({ children, styles, columnWidth = '300px' }) {
    return (
        <Box sx={{
            gap: '1em',
            display: 'grid',
            gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',           
                sm: `repeat(auto-fill, minmax(${columnWidth}, 1fr))`, 
                md: `repeat(auto-fill, minmax(${columnWidth}, 1fr))`, 
             },
            ...styles
        }}> 
            { children }
        </Box>
    )
}