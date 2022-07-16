import { useState } from "react";
import { BASE_URL } from "../Constants/url"
import axios from "axios";
import GlobalStateContext from "../Global/GlobalStateContext"

const GlobalState = (props) => {
    const [profile, setProfile] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [restaurantDetails, setRestaurantDetails] = useState([])
    const [cart, setCart] = useState([])

    // Requisição pegar perfil 
    const getProfile = () => {
        const headers = {headers : {auth : localStorage.getItem("token")}}

        axios
            .get(`${BASE_URL}profile`, headers)

            .then((response) => {
                setProfile(response.data.user)
            })

            .catch((error) => {
                console.log(error.message)
            })
    }

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

    // Requisição enviar pedido
    const postPlaceOrder = (restaurantId, method) => {
        const headers = {headers : {auth : localStorage.getItem("token")}}

        const body = {
            products: cart.map((product) => {
                return {
                    id: product.id,
                    quantity: product.quantity
                }
            }),
            paymentMethod: method
        }
        
        axios
            .post(`${BASE_URL}restaurants/${restaurantId}/order`, body, headers)

            .then(() => {alert("Compra confirmada :)")})

            .catch((error) => {
                console.log(error.message)
            })
    }

    // Função Adicionar produto ao carrinho
    const addProduct = (product, restaurantId) => {
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

        localStorage.setItem("restaurantId", restaurantId)
    }

    // Função remover produto do carrinho
    const removeProduct = (product) => {
        const newCart = cart.map((cartProduct) => {
            if (cartProduct.id === product.id) {
                return {
                    ...cartProduct, quantity: cartProduct.quantity - 1
            }}

            else { return cartProduct }
        })
        
        .filter((cartProduct) => {
            if (cartProduct.quantity < 1) {
                return false
            }

            else { return true }
        })

        setCart(newCart)
    }
    
    const data = {
        // States
        restaurants,
        restaurantDetails,
        cart,
        profile,
       
        // Set States
        setCart,
        setRestaurants,
        
        // Request
        getProfile,
        getRestaurants,
        getRestaurantDetail,
        postPlaceOrder,
        

        // Functions
        addProduct,
        removeProduct
    }

    return (
        <GlobalStateContext.Provider value={data}>
            {props.children}
        </GlobalStateContext.Provider>   
    )
}

export default GlobalState; 