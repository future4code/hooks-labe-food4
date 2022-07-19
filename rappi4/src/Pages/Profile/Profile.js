import { useContext, useEffect } from "react";
import Footer from "../../Constants/Footer";
import GlobalStateContext from "../../Global/GlobalStateContext";
import edit  from "../../Assets/edit.png"
import { useProtectedPage } from "../../Hooks/useProtectedPage"
import { useNavigate } from "react-router-dom";
import {DivTeste, DivTesteImg, DivEndereco} from './styles'



const Profile = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const { profile, orderHistory, ordersHistory } = useContext(GlobalStateContext)
    
    useEffect(() => {ordersHistory()}, [])

    const renderOrders =  orderHistory && orderHistory.map((order) => {
        return (
            <div key={order.createdAt}>
                <h3>{order.restaurantName}</h3>
                <h3><b>SUBTOTAL R$</b>{order.totalPrice.toFixed(2)}</h3>
            </div>
        )
    })

    return (
        <div>
            <h1>Profile</h1>
            <DivTeste>
                <DivTesteImg>
                    <p>{profile.name}</p>
                    <img src={edit} onClick={() => navigate("/perfil/atualizar-perfil")}/>
                </DivTesteImg>
                <p>{profile.email}</p>
                <p>{profile.cpf}</p>
                
                <DivEndereco>
                    <p>Endereço cadastrado</p>
                    <DivTesteImg>
                        <p>{profile.address}</p>
                        <img src={edit} onClick={() => navigate("/cadastro-de-endereco")}/>
                    </DivTesteImg>
                </DivEndereco>

                <h3>Histórico de pedidos</h3>
                <hr></hr>
                {renderOrders}
            </DivTeste>
            <Footer/>
        </div>
    )
}

export default Profile;