import styled from "styled-components";
import avatar from "../Assets/avatar.png"
import homepage from "../Assets/homepage.png"
import shoppingcart from "../Assets/shopping-cart.png"
import { useNavigate } from "react-router-dom"

const FooterStyled = styled.footer`
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding-top: 10px;
    padding-bottom: 5px;
    position: sticky;
    bottom: 0;
    background-color: #ffff;
    border-top: 1px solid #C8C8C8;
`
const FooterImg = styled.img`
    cursor: pointer;
`
const Footer = () => {
    const navigate = useNavigate()
    return (
        <FooterStyled>
            <FooterImg onClick={() => navigate("/feed")} src={homepage} alt="icone home" />
            <FooterImg onClick={() => navigate("/carrinho")} src={shoppingcart} alt="icone carrinho" />
            <FooterImg onClick={""} src={avatar} alt="icone avatar"/>
        </FooterStyled>
    )
}

export default Footer;


