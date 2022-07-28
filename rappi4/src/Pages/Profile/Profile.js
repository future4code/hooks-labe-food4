import { useContext, useEffect } from "react";
import Footer from "../../Constants/Footer";
import GlobalStateContext from "../../Global/GlobalStateContext";
import edit  from "../../Assets/edit.png"
import { useProtectedPage } from "../../Hooks/useProtectedPage"
import { useNavigate } from "react-router-dom";
import { DivLoader } from "../../Constants/LoaderStyle"
import { CircularProgress }  from "@mui/material";
// imports de estilização
import * as S from './styles'

const Profile = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const { profile, orderHistory, ordersHistory, getProfile, isLoading } = useContext(GlobalStateContext)
    
    useEffect(() => {ordersHistory()}, [])  
    useEffect(() => {getProfile()}, [])

    const renderOrders =  orderHistory && orderHistory.map((order) => {
        return (
            <S.Ordens key={order.createdAt}>
                <S.H3RestaurantName>{order.restaurantName}</S.H3RestaurantName>
                <h3><b>SUBTOTAL R$</b>{order.totalPrice.toFixed(2).replace(".", ",")}</h3>
            </S.Ordens>   
        )
    })

    return (
        <div>
            <S.Header>
                <h3>Meu Perfil</h3>
            </S.Header>
            <S.DivInfos>
                <S.DivImg>
                    <p>{profile.name}</p>
                    <img src={edit} onClick={() => navigate("/perfil/atualizar-perfil")} alt="icone lápis"/>
                </S.DivImg>
                <p>{profile.email}</p>
                <p>{profile.cpf}</p>
            </S.DivInfos>
            <S.DivEndereco>
                <S.PEndereco>Endereço cadastrado</S.PEndereco>
                <S.DivImg>
                    <p>{profile.address}</p>
                    <img src={edit} onClick={() => navigate("/cadastro-de-endereco")} alt="icone lápis"/>
                </S.DivImg>
            </S.DivEndereco>
            <S.DivTitleHist>
                <S.PTitle>Histórico de pedidos</S.PTitle>
            </S.DivTitleHist>
            <S.DivRenderOrders>
                {isLoading === true ? <DivLoader><CircularProgress/></DivLoader> : renderOrders}
            </S.DivRenderOrders>
            <Footer/>
        </div>
    )
}

export default Profile;