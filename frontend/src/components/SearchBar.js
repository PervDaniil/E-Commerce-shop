import { Search as SearchIcon} from "@mui/icons-material";
import { Autocomplete, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";


export default function SearchBar({ searchQuery, size = "small" }) {
    return (
        <Autocomplete 
        fullWidth
        options={[]}
        sx={{ '& .MuiOutlinedInput-root' : {borderRadius: '32px'}}}
        renderInput={(props) => (
            <TextField {...props} size={size} label="Search" InputProps={{
                ...props.InputProps, startAdornment: (
                    <InputAdornment>
                        <Tooltip title="Search">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                )
            }}/>
        )
    }/>
    )
}