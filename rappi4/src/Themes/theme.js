import { createTheme} from "@mui/material"
import { grey, orange } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#e86e5a",
            dark: orange[800],
            light: grey[300],
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