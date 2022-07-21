import { useContext, useEffect } from "react";
import Footer from "../../Constants/Footer";
import GlobalStateContext from "../../Global/GlobalStateContext";
import edit  from "../../Assets/edit.png"
import { useProtectedPage } from "../../Hooks/useProtectedPage"
import { useNavigate } from "react-router-dom";
import { DivImg, DivEndereco, PEndereco, 
    Ordens, H3RestaurantName, DivRenderOrders,
    Header, DivInfos, DivTitleHist, PTitle} from './styles'

const Profile = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const { profile, orderHistory, ordersHistory, getProfile } = useContext(GlobalStateContext)
    
    useEffect(() => {ordersHistory()}, [])  
    useEffect(() => {getProfile()}, [])

    const renderOrders =  orderHistory && orderHistory.map((order) => {
        return (
            <Ordens key={order.createdAt}>
                <H3RestaurantName>{order.restaurantName}</H3RestaurantName>
                <h3><b>SUBTOTAL R$</b>{order.totalPrice.toFixed(2).replace(".", ",")}</h3>
            </Ordens>
            
        )
    })

    return (
        <div>
            <Header>
                <h3>Meu Perfil</h3>
            </Header>
            <DivInfos>
                <DivImg>
                    <p>{profile.name}</p>
                    <img src={edit} onClick={() => navigate("/perfil/atualizar-perfil")}/>
                </DivImg>
                <p>{profile.email}</p>
                <p>{profile.cpf}</p>
            </DivInfos>
            <DivEndereco>
                <PEndereco>Endereço cadastrado</PEndereco>
                <DivImg>
                    <p>{profile.address}</p>
                    <img src={edit} onClick={() => navigate("/cadastro-de-endereco")}/>
                </DivImg>
            </DivEndereco>
            <DivTitleHist>
                <PTitle>Histórico de pedidos</PTitle>
            </DivTitleHist>
            <DivRenderOrders>
                {renderOrders}
            </DivRenderOrders>
            <Footer/>
        </div>
    )
}

export default Profile;