import { useState } from "react";
import { BASE_URL } from "../Constants/url"
import axios from "axios";
import GlobalStateContext from "../Global/GlobalStateContext"
import { toast } from "react-toastify";

const GlobalState = (props) => {
    const [profile, setProfile] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [restaurantDetails, setRestaurantDetails] = useState([])
    const [cart, setCart] = useState([])
    const [activeOrder, setActiveOrder] = useState([])
    const [orderHistory, setOrderHistory] = useState([])

    // Função para setar alert 
    const alertSuccess = (message) => {
        toast.success(`${message}`, {
            position: "top-right",
            className: "success-alert",
            autoClose: 2000,
            closeOnClick: true,
            draggable: true,
        })
    }

    const alertError = (message) => {
        toast.error(`${message}`, {
            position: "top-right",
            className: "error-alert",
            autoClose: 2000,
            closeOnClick: true,
            draggable: true,
        })
    }

    const alertWarning = (message) => {
        toast.warning(`${message}`, {
            position: "top-right",
            className: "error-alert",
            autoClose: 2000,
            closeOnClick: true,
            draggable: true,
        })
    }

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

    // Requisição para enviar pedido
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

            .then(() => {
                alertSuccess("Pedido confirmado :)")
                setCart([])
                localStorage.removeItem("restaurantId")              
            })

            .catch((error) => {
                if (error.message.includes("409")) {
                    alertError("Existe outro pedido em andamento!")
                }

                else if (error.message.includes("400") || error.message.includes("404")) {
                    alertWarning("Informações faltando")
                }  
            })
    }

    // Requisição para pegar pedido ativo
    const getActiveOrder = () => {
        const headers = {headers : {auth : localStorage.getItem("token")}}

        axios
            .get(`${BASE_URL}active-order`, headers)

        .then((response) => {
            setActiveOrder(response.data.order);
        })

        .catch((error) => {
            console.log(error.message)
        })
    }

    // Requisição para pegar histórico de pedidos
    const ordersHistory = () => {
        const headers = {headers : {auth : localStorage.getItem("token")}}

        axios
            .get(`${BASE_URL}orders/history`, headers)

        .then((response) => {
            setOrderHistory(response.data.orders)
        })

        .catch((error) => {
            console.log(error)
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
            // Setando alert na tela
            alertSuccess("Produto adicionado ao carrinho")   
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
                alertSuccess("Produto adicionado ao carrinho")
        }

        localStorage.setItem("restaurantId", restaurantId)
    }

    // Função remover todos produtos do carrinho
    const removeProduct = (product) => {
        const newCart = cart.map((cartProduct) => {
            if (cartProduct.id === product.id) {
                return {
                    ...cartProduct, quantity: cartProduct.quantity === 0 
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
    
    // Função adicionar mais um produto ao carrinho
    const addMoreProduct = (product) => {
        const newCart = cart.map((cartProduct) => {
            if (cartProduct.id === product.id) {
                return {
                    ...cartProduct, quantity: cartProduct.quantity + 1
            }}

            else { return cartProduct }
        })
   
        setCart(newCart)
    }

    // Função remover um produto do carrinho
    const removeMoreProduct = (product) => {
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
        activeOrder,
        orderHistory,
       
        // Set States
        setCart,
        setRestaurants,
        
        // Request
        getProfile,
        getRestaurants,
        getRestaurantDetail,
        postPlaceOrder,
        getActiveOrder,
        ordersHistory,
        
        // Functions
        addProduct,
        removeProduct,
        addMoreProduct,
        removeMoreProduct,
        alertSuccess,
        alertError
    }

    return (
        <GlobalStateContext.Provider value={data}>
            {props.children}
        </GlobalStateContext.Provider>   
    )
}

export default GlobalState; 