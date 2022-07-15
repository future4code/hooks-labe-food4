import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants/url"
import axios from "axios";
import GlobalStateContext from "../Global/GlobalStateContext"
import { useParams } from "react-router-dom";

const GlobalState = (props) => {
    const [restaurants, setRestaurants] = useState([])
    const [restaurantDetails, setRestaurantDetails] = useState([])
  
    // Requisição pegar restaurantes
    const getRestaurants = () => {
        const headers = {headers : {auth : localStorage.getItem("token")}}
        
        axios 
            .get(`${BASE_URL}restaurants`, headers)
            
            .then((response) => {
                setRestaurants(response.data.restaurants)
            })

            .catch((error) => {
                console.log(error.message)
            })
    }

    // Requisição pegar detalhes do restaurante
    const getRestaurantDetail = (id) => {
        const headers = {headers : {auth : localStorage.getItem("token")}}

        axios
            .get(`${BASE_URL}restaurants/${id}`, headers)
            
            .then((response) => {
                setRestaurantDetails(response.data.restaurant.products)
            })
            
            .catch((error) => {
                console.log(error.message)
            })
    }

    
    
    const data = {
        restaurants,
        restaurantDetails,
        setRestaurants,
        getRestaurants,
        getRestaurantDetail
    }


    return (
        <GlobalStateContext.Provider value={data}>
            {props.children}
        </GlobalStateContext.Provider>   
    )
}

export default GlobalState; 