import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoFutureEats from "../../Assets/logo-future-eats.png"
import { ContainerSplash } from "./styles"
import CircularProgress from "@mui/material/CircularProgress";

const SplashScreen = () => {
    const navigate = useNavigate()
    
    const FirstPage = () => {
        if (localStorage.getItem("token") !== null) {
            navigate("/feed")
        }

        else {
            navigate("/login")
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {FirstPage()}, 4000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <ContainerSplash>
            <img src={logoFutureEats}/>
            <CircularProgress color="inherit"/>
        </ContainerSplash>
    )
}

export default SplashScreen;