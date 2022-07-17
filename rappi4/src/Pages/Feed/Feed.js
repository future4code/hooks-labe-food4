import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../../Global/GlobalStateContext";
import Footer from "../../Constants/Footer";
import {ImgTam, RestaurantContainer} from './styles'
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DivTeste = styled.div`
    width: 100%;
    height: 120px;
    padding: 10px;
    margin-top: 10px;
    position: sticky;
    bottom: 0;
    background-color: #ffff;
    border-top: 1px solid #C8C8C8;
`

const Feed = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const {restaurants, getRestaurants, activeOrder, getActiveOrder} = useContext(GlobalStateContext)
    const [selectedCategory, setSelectedCategory] = useState("")
    
    useEffect(() => {getRestaurants()}, [])
    useEffect(() => {getActiveOrder()}, [])

    const renderTypesOfFood = restaurants.map((type, index) => {
        return (
            <div key={index}>
                <p onClick={() => setSelectedCategory(type.category)}>{type.category}</p>
            </div>
        )
    })

    const renderRestaurants = restaurants.map((restaurant) => {
        if (restaurant.category === selectedCategory || restaurant.name === selectedCategory) {
            return (
                <RestaurantContainer key={restaurant.id} onClick={() => chooseRestaurant(restaurant.id)}>
                    <ImgTam src={restaurant.logoUrl} alt="imagem logomarca" />
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.deliveryTime} min</p>
                    <p>Frete R$:{restaurant.shipping},00</p>
                </RestaurantContainer>
            )
        }

        else if (selectedCategory === "") {
            return (
                <RestaurantContainer  key={restaurant.id} onClick={() => chooseRestaurant(restaurant.id)}>
                    <ImgTam src={restaurant.logoUrl} alt="imagem logomarca" />
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.deliveryTime} min</p>
                    <p>Frete R$:{restaurant.shipping},00</p>
                </RestaurantContainer>
            )
        }
    })

    const renderActiveOrder = () => {
        if (activeOrder && activeOrder !== null) {
            return (
                <DivTeste>
                    <h3>Pedido em andamento</h3>
                    <p>{activeOrder.restaurantName}</p>
                    <p><b>SUBTOTAL R$:</b> {activeOrder.totalPrice}</p>
                </DivTeste>
            )
        }}
        
   
    const onChangeCategory = (event) => {
        setSelectedCategory(event.target.value)
    } 

    const chooseRestaurant = (param) => {
        navigate(`/feed/restaurante/${param}`)
    }

    return (
        <div>
            <h1>Feed</h1>
            <input
                placeholder="Restaurante"
                value={selectedCategory}
                onChange={onChangeCategory}
            />
            {renderTypesOfFood}
            {renderRestaurants}
            {renderActiveOrder()}
            <Footer/>
        </div>
    )
}

export default Feed;