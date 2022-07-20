import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../../Global/GlobalStateContext";
import Footer from "../../Constants/Footer";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { Button } from "@mui/material";
import { Header, ContainerAddress, DivInfos, 
    H4Infos, ContainerRestaurantAddress, H4InfosRestarant,
    PInfosRestaurant, ContainerProducts, DivProducts, ImgProducts,
    DivInfosProducts, DivBtn, DivBtnQtd, BtnQtd, PProduct, PProductName,
    ContainerSubtotal, DivSubtotal, ContainerSubt, H3Subt, ContainerPayment, H3Payment} from './styles'

const Cart = () => {
    useProtectedPage()
    const { profile, getProfile, restaurants, getRestaurants, cart, removeProduct, postPlaceOrder, addMoreProduct, removeMoreProduct, alertError } = useContext(GlobalStateContext)
    const [paymentMethod, setPaymentMethod] = useState("")

    useEffect(() => {getProfile()}, [])
    useEffect(() => {getRestaurants()}, [])

    const sumTotalCart = (param) => {
        let cartTotalPrice = param

        for (let item of cart) {
            cartTotalPrice += (item.price * item.quantity)
        }
        return cartTotalPrice.toFixed(2).replace(".", ",")
    }

    const delLocalRes = () => {
        localStorage.removeItem('restaurantId')
        return <p>Carrinho vazio 😭</p>
    }
 
    const renderAddress = restaurants.map((restaurant) => {
        if (restaurant.id === localStorage.getItem("restaurantId")) {
            return (
                <DivInfos key={restaurant.id}>
                   <H4InfosRestarant>{restaurant.name}</H4InfosRestarant>
                   <PInfosRestaurant>{restaurant.address}</PInfosRestaurant>
                   <PInfosRestaurant>{restaurant.deliveryTime} - {restaurant.deliveryTime + 10} min</PInfosRestaurant> 
                </DivInfos>
        )}
    })

    const renderCart = cart.map((product) => {
        return (
            <DivProducts key={product.id}>
                <ImgProducts src={product.photoUrl}/>
                <DivInfosProducts>
                    <PProductName>{product.name}</PProductName>
                    <PProduct>{product.description}</PProduct>
                    <p><b>R${product.price.toFixed(2).replace(".", ",")}</b></p>
                </DivInfosProducts>
                <DivBtn>
                    <DivBtnQtd>
                        <BtnQtd onClick={() => removeMoreProduct(product)}>-</BtnQtd>
                        <p>{product.quantity}</p>
                        <BtnQtd onClick={() => addMoreProduct(product)}>+</BtnQtd>
                    </DivBtnQtd>
                    <Button size="small" color="primary" variant="outlined" onClick={() => removeProduct(product)}>Remover</Button>
                </DivBtn>
            </DivProducts>
        )
    })

    const renderShipping = restaurants.map((restaurant) => {
        if (restaurant.id === localStorage.getItem("restaurantId")) {
            return (
                <DivSubtotal key={restaurant.id}>
                   <h4>SUBTOTAL</h4>
                   <ContainerSubt>
                        <p> Frete R${restaurant.shipping},00</p>
                        <H3Subt>R${sumTotalCart(restaurant.shipping)}</H3Subt>
                   </ContainerSubt>
                </DivSubtotal>
        )}
    })

    const confirmBtn = () => {
        if (cart.length <= 0) {
            return <Button onClick={() => alertError("O carrinho está vazio")} color="secondary" variant="contained">Confirmar</Button>
        }

        else if (cart.length > 0) {
            return <Button color="primary" variant="contained" onClick={() => postPlaceOrder(localStorage.getItem("restaurantId"), paymentMethod)}>Confirmar</Button>
        }
    }

    return (
        <div>
            <Header>
                <h3>Meu carrinho</h3>
            </Header>
            <ContainerAddress>
                <DivInfos>
                    <H4Infos>Endereço de entrega</H4Infos>
                    <p>{profile.address}</p>
                </DivInfos>
            </ContainerAddress>
            <ContainerRestaurantAddress>
                {renderAddress}
            </ContainerRestaurantAddress>
            <ContainerProducts>
                {cart.length > 0 ? renderCart : delLocalRes()}
            </ContainerProducts>
            <ContainerSubtotal>
                {renderShipping}
            </ContainerSubtotal>
            <ContainerPayment>
                <H3Payment>Forma de pagamento</H3Payment>
                <form>
                    <input 
                        id="money"
                        type="radio"
                        name="form-pag"
                        onClick={() => setPaymentMethod("money")}
                    />
                    <label htmlFor="money" onClick={() => setPaymentMethod("money")}> Dinheiro </label>
                    <br></br>
                    <input 
                        id="creditcard"
                        type="radio"
                        name="form-pag"
                        onClick={() => setPaymentMethod("creditcard")}
                    />
                    <label htmlFor="creditcard" onClick={() => setPaymentMethod("creditcard")}> Cartão de crédito </label>
                </form>
                {confirmBtn()}
            </ContainerPayment>
           <Footer/>
        </div>
    )
}

export default Cart;