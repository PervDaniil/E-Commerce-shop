import { Button, styled } from "@mui/material";


export default function RoundedButton({ children, ...props }) {
    const CustomButton = styled(Button)({
        borderRadius: '24px',
    })

    return (
        <CustomButton {...props}>
            { children }
        </CustomButton>
    )
}