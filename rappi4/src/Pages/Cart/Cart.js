import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../../Global/GlobalStateContext";
import Footer from "../../Constants/Footer";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { Button } from "@mui/material";
import {ImgTest, DivButtonsAdd} from './styles'


const Cart = () => {
    useProtectedPage()
    const { profile, getProfile, restaurants, getRestaurants, cart, removeProduct, postPlaceOrder, addMoreProduct, removeMoreProduct } = useContext(GlobalStateContext)
    const [paymentMethod, setPaymentMethod] = useState("")

    useEffect(() => {getProfile()}, [])
    useEffect(() => {getRestaurants()}, [])

    const sumTotalCart = (param) => {
        let cartTotalPrice = param

        for (let item of cart) {
            cartTotalPrice += (item.price * item.quantity)
        }
        return cartTotalPrice.toFixed(2)
    }

    const delLocalRes = () => {
        localStorage.removeItem('restaurantId')
        return <p>Carrinho vazio 😭</p>
    }
 
    const renderAddress = restaurants.map((restaurant) => {
        if (restaurant.id === localStorage.getItem("restaurantId")) {
            return (
                <div key={restaurant.id}>
                   <h3>{restaurant.name}</h3>
                   <p>{restaurant.address}</p>
                   <p>{restaurant.deliveryTime} - {restaurant.deliveryTime + 10} min</p> 
                </div>
        )}
    })

    const renderCart = cart.map((product) => {
        return (
            <div key={product.id}>
                <ImgTest src={product.photoUrl}/>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <DivButtonsAdd>
                    <button onClick={() => removeMoreProduct(product)}>-</button>
                    <p>{product.quantity}</p>
                    <button onClick={() => addMoreProduct(product)}>+</button>
                </DivButtonsAdd>
                <button onClick={() => removeProduct(product)}>Remover</button>
            </div>
        )
    })

    const renderShipping = restaurants.map((restaurant) => {
        if (restaurant.id === localStorage.getItem("restaurantId")) {
            return (
                <div key={restaurant.id}>
                   <p> Frete R$ {restaurant.shipping},00</p>
                   <h3> Subtotal: R$ {sumTotalCart(restaurant.shipping)}</h3>
                </div>
        )}
    })

    console.log(paymentMethod)

    return (
        <div>
            <h1>Cart</h1>
            <h3>Endereço de entrega</h3>
            <p>{profile.address}</p>
            <br></br>
            {renderAddress}
            <br></br>
            {cart.length > 0 ? renderCart : delLocalRes()}
            <br></br>
            {renderShipping}
            <br></br>
            <h3>Forma de pagamento</h3>
            
            <form>
                <input 
                    id="money"
                    type="radio"
                    name="form-pag"
                    onClick={() => setPaymentMethod("money")}
                />
                <label htmlFor="money" onClick={() => setPaymentMethod("money")}> Dinheiro </label>
                
                <input 
                    id="creditcard"
                    type="radio"
                    name="form-pag"
                    onClick={() => setPaymentMethod("creditcard")}
                />
                <label htmlFor="creditcard" onClick={() => setPaymentMethod("creditcard")}> Cartão de crédito </label>
            </form>
            <Button color="primary" variant="contained" onClick={() => postPlaceOrder(localStorage.getItem("restaurantId"), paymentMethod)}>Confirmar</Button>
           <Footer/>
        </div>
    )
}

export default Cart;