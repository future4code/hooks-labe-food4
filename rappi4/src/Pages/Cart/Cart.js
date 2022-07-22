import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../../Global/GlobalStateContext";
import Footer from "../../Constants/Footer";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { Button } from "@mui/material";
import * as S from "./styles"

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
                <S.DivInfos key={restaurant.id}>
                   <S.H4InfosRestarant>{restaurant.name}</S.H4InfosRestarant>
                   <S.PInfosRestaurant>{restaurant.address}</S.PInfosRestaurant>
                   <S.PInfosRestaurant>{restaurant.deliveryTime} - {restaurant.deliveryTime + 10} min</S.PInfosRestaurant> 
                </S.DivInfos>
        )}
    })

    const renderCart = cart.map((product) => {
        return (
            <S.DivProducts key={product.id}>
                <S.ImgProducts src={product.photoUrl}/>
                <S.DivInfosProducts>
                    <S.PProductName>{product.name}</S.PProductName>
                    <S.PProduct>{product.description}</S.PProduct>
                    <p><b>R${product.price.toFixed(2).replace(".", ",")}</b></p>
                </S.DivInfosProducts>
                <S.DivBtn>
                    <S.DivBtnQtd>
                        <S.BtnQtd onClick={() => removeMoreProduct(product)}>-</S.BtnQtd>
                        <p>{product.quantity}</p>
                        <S.BtnQtd onClick={() => addMoreProduct(product)}>+</S.BtnQtd>
                    </S.DivBtnQtd>
                    <Button size="small" color="primary" variant="outlined" onClick={() => removeProduct(product)}>Remover</Button>
                </S.DivBtn>
            </S.DivProducts>
        )
    })

    const renderShipping = restaurants.map((restaurant) => {
        if (restaurant.id === localStorage.getItem("restaurantId")) {
            return (
                <S.DivSubtotal key={restaurant.id}>
                   <h4>SUBTOTAL</h4>
                   <S.ContainerSubt>
                        <p> Frete R${restaurant.shipping},00</p>
                        <S.H3Subt>R${sumTotalCart(restaurant.shipping)}</S.H3Subt>
                   </S.ContainerSubt>
                </S.DivSubtotal>
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
            <S.Header>
                <h3>Meu carrinho</h3>
            </S.Header>
            <S.ContainerAddress>
                <S.DivInfos>
                    <S.H4Infos>Endereço de entrega</S.H4Infos>
                    <p>{profile.address}</p>
                </S.DivInfos>
            </S.ContainerAddress>
            <S.ContainerRestaurantAddress>
                {renderAddress}
            </S.ContainerRestaurantAddress>
            <S.ContainerProducts>
                {cart.length > 0 ? renderCart : delLocalRes()}
            </S.ContainerProducts>
            <S.ContainerSubtotal>
                {renderShipping}
            </S.ContainerSubtotal>
            <S.ContainerPayment>
                <S.H3Payment>Forma de pagamento</S.H3Payment>
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
            </S.ContainerPayment>
           <Footer/>
        </div>
    )
}

export default Cart;