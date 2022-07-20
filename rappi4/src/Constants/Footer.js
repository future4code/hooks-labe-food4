// icone default
import avatar from "../Assets/avatar.png"
import homepage from "../Assets/homepage.png"
import shoppingcart from "../Assets/shopping-cart.png"
// icone ativo
import avatarActived from "../Assets/avataractived.png"
import homepageActived from "../Assets/homepageactived.png"
import shoppingcartActived from "../Assets/shopping-cartactived.png"
// imports default
import { useNavigate } from "react-router-dom"
import styled from "styled-components";

const Container = styled.div`
    margin-top: 12vh;
`
const FooterStyled = styled.footer`
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding-top: 10px;
    padding-bottom: 5px;
    position: fixed;
    bottom: 0;
    background-color: #ffff;
    border-top: 1px solid #C8C8C8;
`
const FooterImg = styled.img`
    cursor: pointer;
`
const Footer = () => {
    const navigate = useNavigate()
    
    const changeCurrentPage = (page, navi) =>{
        localStorage.setItem("page", page)
        navigate(navi)
    }

    switch(localStorage.getItem("page")) {
        default : 
            return (
                <Container>
                    <FooterStyled>
                        <FooterImg src={homepageActived} onClick={() => changeCurrentPage("home", "/feed")} alt="icone home"/>
                        <FooterImg src={shoppingcart} onClick={() => changeCurrentPage("cart", "/carrinho")}  alt="icone carrinho"/>
                        <FooterImg src={avatar} onClick={() => changeCurrentPage("profile", "/perfil")}  alt="icone perfil"/>
                    </FooterStyled>
                </Container>
            )

        case "cart" :
            return (
                <Container>
                    <FooterStyled>
                        <FooterImg src={homepage} onClick={() => changeCurrentPage("home", "/feed")} alt="icone home"/>
                        <FooterImg src={shoppingcartActived} onClick={() => changeCurrentPage("cart", "/carrinho")}  alt="icone carrinho"/>
                        <FooterImg src={avatar} onClick={() => changeCurrentPage("profile", "/perfil")}  alt="icone perfil"/>
                    </FooterStyled>
                </Container>
            )

        case "profile" : 
            return (
                <Container>
                    <FooterStyled>
                        <FooterImg src={homepage} onClick={() => changeCurrentPage("home", "/feed")} alt="icone home"/>
                        <FooterImg src={shoppingcart} onClick={() => changeCurrentPage("cart", "/carrinho")}  alt="icone carrinho"/>
                        <FooterImg src={avatarActived} onClick={() => changeCurrentPage("profile", "/perfil")}  alt="icone perfil"/>
                    </FooterStyled>
                </Container>
            )
    }
}

export default Footer;


