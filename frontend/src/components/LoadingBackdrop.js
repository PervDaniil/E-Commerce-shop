import { Backdrop, CircularProgress } from "@mui/material";


export default function LoadingBackdrop() {
    return (
        <Backdrop>
            <CircularProgress />
        </Backdrop>
    )
}