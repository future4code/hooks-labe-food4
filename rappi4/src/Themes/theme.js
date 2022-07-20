import { createTheme} from "@mui/material"

export const theme = createTheme({
    palette: {
        primary: {
            main: "#e86e5a",
            contrastText: '#ffffff',
        },

        secondary: {
            main: "#ff9a8a",
            contrastText: '#ffffff',
          },
        
        terciary: {
            main: "#000000",
            contrastText: '#ffffff',    
        },
    },

    typography: {
        button: {
            textTransform: 'none',	
        }
    }
});