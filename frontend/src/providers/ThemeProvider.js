import { createContext, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider as ThemeProviderMUI } from '@mui/material';


const ThemeContext = createContext();
export default function ThemeProvider({ children }) {
    const [themeMode, setThemeMode] = useState('dark');


    const HandleThemeModeChange = () => {
        setThemeMode(mode => (mode === 'dark' ? 'light' : 'dark'));
    }

    const UserTheme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#0095f6', //#bafc03 //#0095f6
            },
            secondary: {
                main: '#777777',
            },
            background: {
                default: themeMode === 'dark' ? '#121212' : '#fff',
                paper: themeMode === 'dark' ? '#101010' : '#eee'
            },
            boxShadow: {
                dark: '#000',
            },
            common: {
                black: '#000',
            },
            text: {
                primary: themeMode === 'dark' ? '#ececec' : '#000',
                secondary: '#777777',
            },
        },
        typography: {
            fontFamily: 'Montserrat'
        }
    })


    return (
        <ThemeContext.Provider value={{ HandleThemeModeChange }}>
            <ThemeProviderMUI theme={UserTheme}>
                <CssBaseline />
                { children }
            </ThemeProviderMUI>
        </ThemeContext.Provider>
    )
}