import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../../Global/GlobalStateContext";
import Footer from "../../Constants/Footer";
import {ImgTam, RestaurantContainer} from './styles'
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { useNavigate } from "react-router-dom";

const Feed = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const {restaurants, getRestaurants} = useContext(GlobalStateContext)
    const [selectedCategory, setSelectedCategory] = useState("")
    
    useEffect(() => {getRestaurants()}, [])

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
            <Footer/>
        </div>
    )
}

export default Feed;