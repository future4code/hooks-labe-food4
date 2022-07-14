import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../../Global/GlobalStateContext";
import styled from "styled-components";
import Footer from "../../Constants/Footer";

const ImgTam = styled.img`
    width: 100%;
    height: 200px;
`

const Feed = () => {
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
        if (restaurant.category === selectedCategory) {
            return (
                <div key={restaurant.id}>
                    <ImgTam src={restaurant.logoUrl}/>
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.deliveryTime} min</p>
                    <p>Frete R$:{restaurant.shipping},00</p>
                </div>
            )
        }

        else if (selectedCategory === "") {
            return (
                <div key={restaurant.id}>
                    <ImgTam src={restaurant.logoUrl}/>
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.deliveryTime} min</p>
                    <p>Frete R$:{restaurant.shipping},00</p>
                </div>
            )
        }
    })
   
    const onChangeCategory = (event) => {
        setSelectedCategory(event.target.value)
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