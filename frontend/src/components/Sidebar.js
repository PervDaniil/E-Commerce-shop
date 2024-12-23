import {
    Drawer, List, ListItem, useMediaQuery,
} from "@mui/material";
import SearchBar from "./SearchBar";
import FlexColumnCenter from "./layouts/flex/FlexColumnCenter";


export default function Sidebar({ children }) {
    const isMobile = useMediaQuery('(min-width: 600px)');

    return (
        <Drawer anchor={!isMobile ? 'top' : 'left'} variant="permanent" sx={{
            '& *::-webkit-scrollbar' : { width: '8px' },
            '& *::-webkit-scrollbar-thumb' : { background: theme => `${theme.palette.primary.main}`, borderRadius: '24px' },
        }}>
            <List>
                <FlexColumnCenter>
                    <ListItem>
                        <SearchBar />
                    </ListItem>
                    { children }
                </FlexColumnCenter>
            </List>
        </Drawer>
    )
}

