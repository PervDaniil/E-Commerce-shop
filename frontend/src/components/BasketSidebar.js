import {
    Drawer, List, ListItem, useMediaQuery,
} from "@mui/material";
import SearchBar from "./SearchBar";
import FlexColumnCenter from "./layouts/flex/FlexColumnCenter";


export default function BasketSidebar() {
    const isMobile = useMediaQuery('(min-width: 600px)');

    return (
        <Drawer anchor={!isMobile ? 'top' : 'left'} variant="permanent">
            <List sx={{ width: '320px'}}>
                <FlexColumnCenter>
                    <ListItem>
                        <SearchBar />
                    </ListItem>
                </FlexColumnCenter>
            </List>
        </Drawer>
    )
}

