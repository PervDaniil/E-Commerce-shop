import { Search as SearchIcon} from "@mui/icons-material";
import { Autocomplete, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";


export default function SearchBar({ size = "small", options = [], onChange, styles }) {
    return (
        <Autocomplete 
        fullWidth
        options={options}
        sx={{ '& .MuiOutlinedInput-root' : {borderRadius: '32px'}, ...styles}}
        renderInput={(props) => (
            <TextField {...props} onChange={onChange} size={size} label="Search" InputProps={{
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