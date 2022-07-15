import { useContext, useEffect } from "react";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import GlobalStateContext from "../../Global/GlobalStateContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../Constants/Footer";

const ImgTest = styled.img`
    width: 100%;
`

const RestaurantDetail = () => {
    useProtectedPage()
    const {restaurants, getRestaurants, restaurantDetails, getRestaurantDetail} = useContext(GlobalStateContext)
    const {id} = useParams()
    
    useEffect(() => {getRestaurants()}, [])
    useEffect(() => {getRestaurantDetail(id)}, [])

    const renderDetailsRestaurant = restaurants.map((restaurant) => {
        if (restaurant.id === id) {
            return (
                <div key={restaurant.id}>
                    <ImgTest src={restaurant.logoUrl} alt="imagem logomarca" />
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.category}</p>
                    <p>{restaurant.deliveryTime} min</p>
                    <p>Frete R$:{restaurant.shipping},00</p>
                    <p>{restaurant.address}</p>
                </div>
        )}
    })

    const renderMainProducts = restaurantDetails.map((product) => {
        if (product.category !== "Acompanhamento" && product.category !== "Bebida") {
            return (
                <div key={product.id}>
                    <ImgTest src={product.photoUrl} alt="imagem produto" />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <button>Adicionar</button>
                </div>
        )}    
    })

    const renderSideDish = restaurantDetails.map((product) => {
        if (product.category === "Acompanhamento") {
            return (
                <div key={product.id}>
                    <ImgTest src={product.photoUrl} alt="imagem produto" />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <button>Adicionar</button>
                </div>
        )} 
    })

    const renderDrinks = restaurantDetails.map((product) => {
        if (product.category === "Bebida") {
            return (
                <div key={product.id}>
                    <ImgTest src={product.photoUrl} alt="imagem produto" />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <button>Adicionar</button>
                </div>
        )} 
    })

    return (
        <div>
            <h1>Result</h1>
            {renderDetailsRestaurant}
            <h2>Principais</h2>
            {renderMainProducts}
            <h2>Acompanhamentos</h2>
            {renderSideDish}
            <h2>Bebidas</h2>
            {renderDrinks}
            <Footer/>
        </div>
    )
}

export default RestaurantDetail;