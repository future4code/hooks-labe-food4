import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../../Global/GlobalStateContext";
import Footer from "../../Constants/Footer";
import styled from "styled-components";
import { useProtectedPage } from "../../Hooks/useProtectedPage";

const ImgTest = styled.img`
    width: 50%;
`
const DivButtonsAdd = styled.div`
    display: flex;
`
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

    return (
        <div>
            <h1>Cart</h1>
            
            <h3>Endereço de entrega</h3>
            <p>{profile.address}</p>
            <br></br>
            {renderAddress}
            <br></br>
            {renderCart}
            <br></br>
            {renderShipping}
            <br></br>
            <h3>Forma de pagamento</h3>
            
            <form>
                <input 
                    id="money"
                    type="radio"
                    name="form-pag"
                />
                <label htmlFor="money" onClick={() => setPaymentMethod("money")}> Dinheiro </label>
                
                <input 
                    id="creditcard"
                    type="radio"
                    name="form-pag"
                />
                <label htmlFor="creditcard" onClick={() => setPaymentMethod("creditcard")}> Cartão de crédito </label>
            </form>

            <button onClick={() => postPlaceOrder(localStorage.getItem("restaurantId"), paymentMethod)}>Confirmar</button>

           <Footer/>
        </div>
    )
}

export default Cart;