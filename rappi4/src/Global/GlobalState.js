import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants/url"
import axios from "axios";
import GlobalStateContext from "../Global/GlobalStateContext"

const GlobalState = (props) => {
    const [restaurants, setRestaurants] = useState([])
    
    const getRestaurants = () => {
        const headers = {
            headers : {
                auth : localStorage.getItem("token")
            }}
        
        axios 
            .get(`${BASE_URL}restaurants`, headers)
            
            .then((response) => {
                setRestaurants(response.data.restaurants)
            })

            .catch((error) => {
                console.log(error.message)
            })
    }

    
    
    const data = {
        restaurants,
        setRestaurants,
        getRestaurants
    }


    return (
        <GlobalStateContext.Provider value={data}>
            {props.children}
        </GlobalStateContext.Provider>   
    )
}

export default GlobalState; 