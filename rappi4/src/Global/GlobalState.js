import { useState } from "react";
import { BASE_URL } from "../Constants/url"
import axios from "axios";
import GlobalStateContext from "../Global/GlobalStateContext"

const GlobalState = (props) => {
    const [restaurants, setRestaurants] = useState([])
    const [restaurantDetails, setRestaurantDetails] = useState([])
    const [cart, setCart] = useState([])

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

    // Função Adicionar produto ao carrinho
    const addProduct = (product) => {
        const index = cart.findIndex((cartProduct) => {
            if (cartProduct.id === product.id) {
                return true
            }
            else { return  false }
        })

        if (index === -1) {
            const setProduct = {
                ...product,
                quantity : 1
            }
            const newCart = [...cart, setProduct]
            setCart(newCart)
            alert("Produto adicionado ao carrinho")
        }

        else {
            const newCart = cart.map((cartProduct) => {
                if (cartProduct.id === product.id) {
                    return {
                        ...cartProduct, quantity: cartProduct.quantity + 1 
                }}

                else { return cartProduct }
            })
                setCart(newCart)
                alert("Mais um item adicionado ao carrinho")
        }
    }
    
    const data = {
        // States
        restaurants,
        restaurantDetails,
        cart,
       
        // Set States
        setCart,
        setRestaurants,
        
        // Request
        getRestaurants,
        getRestaurantDetail,

        // Functions
        addProduct
    }

    return (
        <GlobalStateContext.Provider value={data}>
            {props.children}
        </GlobalStateContext.Provider>   
    )
}

export default GlobalState; 