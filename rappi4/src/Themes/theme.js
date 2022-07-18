import { orange, red, blue } from "@mui/material/colors";
import { createTheme } from "@mui/material"

export const theme = createTheme({
    palette: {
        primary: {
            main: "#e86e5a",
            contrastText: '#ffffff',
        },

        secondary: {
            main: "#ffc6b6",
            contrastText: '#ffffff',
          },
    }
});