import { useContext, useEffect } from "react";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import GlobalStateContext from "../../Global/GlobalStateContext";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../Constants/Footer";
import Button from "@mui/material/Button";
import back from "../../Assets/back.png"
// imports de estilização
import { DivBody, Header, BackImgHeader, ContainerInfos, 
    DivInfosRestaurant, ImgInfosRestaurant, H3InfosRestaurant, 
    PInfosRestaurant, ShippingAndDelivery, ContainerProducts,
    DivProducts, ImgProducts, DivInfosProducts, DivBtnProducts,
    PRestaurantProducts, H3divProducts } from './styles'

const RestaurantDetail = () => {
    const navigate = useNavigate()
    useProtectedPage()
    const {restaurants, getRestaurants, restaurantDetails, getRestaurantDetail, addProduct} = useContext(GlobalStateContext)
    const {id} = useParams()
    
    useEffect(() => {getRestaurants()}, [])
    useEffect(() => {getRestaurantDetail(id)}, [])

    const renderDetailsRestaurant = restaurants.map((restaurant) => {
        if (restaurant.id === id) {
            return (
                <DivInfosRestaurant key={restaurant.id}>
                    <ImgInfosRestaurant src={restaurant.logoUrl} alt="imagem logomarca" />
                    <H3InfosRestaurant>{restaurant.name}</H3InfosRestaurant>
                    <PInfosRestaurant>{restaurant.category}</PInfosRestaurant>
                    <ShippingAndDelivery>
                        <PInfosRestaurant>{restaurant.deliveryTime} - {restaurant.deliveryTime + 10} min</PInfosRestaurant>
                        <PInfosRestaurant>Frete R${restaurant.shipping.toFixed(2).replace(".", ",")}</PInfosRestaurant>
                    </ShippingAndDelivery>
                    <PInfosRestaurant>{restaurant.address}</PInfosRestaurant>
                </DivInfosRestaurant>
        )}
    })

    const renderMainProducts = restaurantDetails.map((product) => {
        if (product.category !== "Acompanhamento" && product.category !== "Bebida") {
            return (
                <DivProducts key={product.id}>
                    <ImgProducts src={product.photoUrl} alt="imagem produto" />
                    <DivInfosProducts>
                        <PRestaurantProducts><b>{product.name}</b></PRestaurantProducts>
                        <PInfosRestaurant>{product.description}</PInfosRestaurant>
                        <p><b>R${product.price.toFixed(2).replace(".", ",")}</b></p>
                    </DivInfosProducts>
                    <DivBtnProducts>
                        <p></p>
                        <p></p>
                        <Button color="terciary" variant="outlined" disableElevation onClick={() => addProduct(product, id)}>Adicionar</Button>    
                    </DivBtnProducts>
                </DivProducts>
        )}    
    })

    const renderSideDish = restaurantDetails.map((product) => {
        if (product.category === "Acompanhamento") {
            return (
                <DivProducts key={product.id}>
                    <ImgProducts src={product.photoUrl} alt="imagem produto"/>
                    <DivInfosProducts>
                        <PRestaurantProducts><b>{product.name}</b></PRestaurantProducts>
                        <PInfosRestaurant>{product.description}</PInfosRestaurant>
                        <p><b>R${product.price.toFixed(2).replace(".", ",")}</b></p>
                    </DivInfosProducts>
                    <DivBtnProducts>
                        <p></p>
                        <p></p>
                        <Button color="terciary" variant="outlined" disableElevation onClick={() => addProduct(product, id)}>Adicionar</Button>
                    </DivBtnProducts>
                </DivProducts>
        )} 
    })

    const renderDrinks = restaurantDetails.map((product) => {
        if (product.category === "Bebida") {
            return ( 
                <DivProducts key={product.id}>
                    <ImgProducts src={product.photoUrl} alt="imagem produto"/>
                    <DivInfosProducts>
                        <PRestaurantProducts><b>{product.name}</b></PRestaurantProducts>
                        <PInfosRestaurant>{product.description}</PInfosRestaurant>
                        <p><b>R${product.price.toFixed(2).replace(".", ",")}</b></p>
                    </DivInfosProducts>
                    <DivBtnProducts>
                        <p></p>
                        <p></p>
                        <Button color="terciary" variant="outlined" disableElevation onClick={() => addProduct(product, id)}>Adicionar</Button>
                    </DivBtnProducts>
                </DivProducts>
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
        <DivBody>
            <Header>
                <BackImgHeader onClick={() => navigate(-1)} src={back}/>
                <h3>Restaurante</h3> 
                <div></div> 
            </Header>
    
            <ContainerInfos>
                {renderDetailsRestaurant}
            </ContainerInfos>
            
            <ContainerProducts>
                    <H3divProducts><h3>Principais</h3></H3divProducts>
                    {renderMainProducts}
                
                    {mapSide.includes(true) && <H3divProducts><h3>Acompanhamentos</h3></H3divProducts>}
                    {renderSideDish}
                    
                    {mapDrink.includes(true) && <H3divProducts><h3>Bebidas</h3></H3divProducts>}
                    {renderDrinks}
            </ContainerProducts>
            <br></br>
            <Footer/>          
        </DivBody>
    )
}

export default RestaurantDetail;