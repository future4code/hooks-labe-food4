import { useContext, useEffect } from "react";
import Footer from "../../Constants/Footer";
import GlobalStateContext from "../../Global/GlobalStateContext";
import edit  from "../../Assets/edit.png"
import { useProtectedPage } from "../../Hooks/useProtectedPage"
import { useNavigate } from "react-router-dom";
import {DivTeste, DivTesteImg, DivEndereco, PEndereco, H3Profile, Ordens, H3RestaurantName, DivRenderOrders} from './styles'



const Profile = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const { profile, orderHistory, ordersHistory } = useContext(GlobalStateContext)
    
    useEffect(() => {ordersHistory()}, [])

    const renderOrders =  orderHistory && orderHistory.map((order) => {
        return (
            <Ordens key={order.createdAt}>
                <H3RestaurantName>{order.restaurantName}</H3RestaurantName>
                <h3><b>SUBTOTAL R$</b>{order.totalPrice.toFixed(2)}</h3>
            </Ordens>
            
        )
    })

    return (
        <div>
            <H3Profile>Meu Perfil</H3Profile>
            <hr></hr>
            <DivTeste>
                <DivTesteImg>
                    <p>{profile.name}</p>
                    <img src={edit} onClick={() => navigate("/perfil/atualizar-perfil")}/>
                </DivTesteImg>
                <p>{profile.email}</p>
                <p>{profile.cpf}</p>
                
                <DivEndereco>
                    <PEndereco>Endereço cadastrado</PEndereco>
                    <DivTesteImg>
                        <p>{profile.address}</p>
                        <img src={edit} onClick={() => navigate("/cadastro-de-endereco")}/>
                    </DivTesteImg>
                </DivEndereco>

                <p>Histórico de pedidos</p>
                <hr></hr>
                
                <DivRenderOrders>
                    {renderOrders}
                </DivRenderOrders>
                
                
            </DivTeste>
            <Footer/>
        </div>
    )
}

export default Profile;