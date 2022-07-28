import { useContext, useEffect } from "react";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import GlobalStateContext from "../../Global/GlobalStateContext";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../Constants/Footer";
import Button from "@mui/material/Button";
import back from "../../Assets/back.png"
import { CircularProgress } from "@mui/material";
// imports de estilização
import * as S from './styles'
import { DivLoader } from "../../Constants/LoaderStyle";

const RestaurantDetail = () => {
    const navigate = useNavigate()
    useProtectedPage()
    const {restaurants, getRestaurants, restaurantDetails, getRestaurantDetail, addProduct, isLoading} = useContext(GlobalStateContext)
    const {id} = useParams()
    
    useEffect(() => {getRestaurants()}, [])
    useEffect(() => {getRestaurantDetail(id)}, [])

    const renderDetailsRestaurant = restaurants.map((restaurant) => {
        if (restaurant.id === id) {
            return (
                <S.DivInfosRestaurant key={restaurant.id}>
                    <S.ImgInfosRestaurant src={restaurant.logoUrl} alt="imagem logomarca"/>
                    <S.H3InfosRestaurant>{restaurant.name}</S.H3InfosRestaurant>
                    <S.PInfosRestaurant>{restaurant.category}</S.PInfosRestaurant>
                    <S.ShippingAndDelivery>
                        <S.PInfosRestaurant>{restaurant.deliveryTime} - {restaurant.deliveryTime + 10} min</S.PInfosRestaurant>
                        <S.PInfosRestaurant>Frete R${restaurant.shipping.toFixed(2).replace(".", ",")}</S.PInfosRestaurant>
                    </S.ShippingAndDelivery>
                    <S.PInfosRestaurant>{restaurant.address}</S.PInfosRestaurant>
                </S.DivInfosRestaurant>
        )}
    })

    const renderMainProducts = restaurantDetails.map((product) => {
        if (product.category !== "Acompanhamento" && product.category !== "Bebida") {
            return (
                <S.DivProducts key={product.id}>
                    <S.ImgProducts src={product.photoUrl} alt="imagem produto"/>
                    <S.DivInfosProducts>
                        <S.PRestaurantProducts><b>{product.name}</b></S.PRestaurantProducts>
                        <S.PInfosRestaurant>{product.description}</S.PInfosRestaurant>
                        <p><b>R${product.price.toFixed(2).replace(".", ",")}</b></p>
                    </S.DivInfosProducts>
                    <S.DivBtnProducts>
                        <p></p>
                        <p></p>
                        <Button color="terciary" variant="outlined" disableElevation onClick={() => addProduct(product, id)}>Adicionar</Button>    
                    </S.DivBtnProducts>
                </S.DivProducts>
        )}    
    })

    const renderSideDish = restaurantDetails.map((product) => {
        if (product.category === "Acompanhamento") {
            return (
                <S.DivProducts key={product.id}>
                    <S.ImgProducts src={product.photoUrl} alt="imagem produto"/>
                    <S.DivInfosProducts>
                        <S.PRestaurantProducts><b>{product.name}</b></S.PRestaurantProducts>
                        <S.PInfosRestaurant>{product.description}</S.PInfosRestaurant>
                        <p><b>R${product.price.toFixed(2).replace(".", ",")}</b></p>
                    </S.DivInfosProducts>
                    <S.DivBtnProducts>
                        <p></p>
                        <p></p>
                        <Button color="terciary" variant="outlined" disableElevation onClick={() => addProduct(product, id)}>Adicionar</Button>
                    </S.DivBtnProducts>
                </S.DivProducts>
        )} 
    })

    const renderDrinks = restaurantDetails.map((product) => {
        if (product.category === "Bebida") {
            return ( 
                <S.DivProducts key={product.id}>
                    <S.ImgProducts src={product.photoUrl} alt="imagem produto"/>
                    <S.DivInfosProducts>
                        <S.PRestaurantProducts><b>{product.name}</b></S.PRestaurantProducts>
                        <S.PInfosRestaurant>{product.description}</S.PInfosRestaurant>
                        <p><b>R${product.price.toFixed(2).replace(".", ",")}</b></p>
                    </S.DivInfosProducts>
                    <S.DivBtnProducts>
                        <p></p>
                        <p></p>
                        <Button color="terciary" variant="outlined" disableElevation onClick={() => addProduct(product, id)}>Adicionar</Button>
                    </S.DivBtnProducts>
                </S.DivProducts>
        )} 
    })

    const mapSide = restaurantDetails.map((side) => {
        if (side.category === "Acompanhamento") {
            return true
        }
    })

    const mapDrink = restaurantDetails.map((drink) => {
        if (drink.category === "Bebida") {
            return true
        }
    })

    return (
        <S.DivBody>
            <S.Header>
                <S.BackImgHeader onClick={() => navigate(-1)} src={back} alt="icone de voltar"/>
                <h3>Restaurante</h3> 
                <div></div> 
            </S.Header>
    
            <S.ContainerInfos>
                {renderDetailsRestaurant}
            </S.ContainerInfos>
            
            <S.ContainerProducts>
                    <S.H3divProducts><h3>Principais</h3></S.H3divProducts>
                    {isLoading === true ? <DivLoader><CircularProgress/></DivLoader>: renderMainProducts}
                
                    {mapSide.includes(true) && <S.H3divProducts><h3>Acompanhamentos</h3></S.H3divProducts>}
                    {renderSideDish}
                    
                    {mapDrink.includes(true) && <S.H3divProducts><h3>Bebidas</h3></S.H3divProducts>}
                    {renderDrinks}
            </S.ContainerProducts>
            <Footer/>          
        </S.DivBody>
    )
}

export default RestaurantDetail;