import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../../Global/GlobalStateContext";
import Footer from "../../Constants/Footer";
import * as S from "./styles";
import { DivLoader } from "../../Constants/LoaderStyle";
import { TextField } from "@mui/material";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import exitIcon from "../../Assets/exit-icon.svg";

const Feed = () => {
  useProtectedPage();
  const navigate = useNavigate();
  const {restaurants, getRestaurants, activeOrder, getActiveOrder, isLoading, setIsLoading} = useContext(GlobalStateContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {getRestaurants()}, []);
  useEffect(() => {getActiveOrder()}, []);

  const renderTypesOfFood = restaurants.map((type, index) => {
    if (type.category === selectedCategory) {
      return (
        <div key={index}>
          <S.PChoosed onClick={() => setSelectedCategory(type.category)}>{type.category}</S.PChoosed>
        </div>
    )} 
    
    else {
      return (
        <div key={index}>
          <p onClick={() => setSelectedCategory(type.category)}>{type.category}</p>
        </div>
    )}
  })

  const renderRestaurants = restaurants.map((restaurant) => {
    if (restaurant.category === selectedCategory || restaurant.name === selectedCategory) {
      return (
        <S.CardContainer key={restaurant.id} onClick={() => chooseRestaurant(restaurant.id)}>
          <S.ImageSize src={restaurant.logoUrl} alt="imagem logomarca" />
          <S.RestaurantName>{restaurant.name}</S.RestaurantName>
          <S.DeliveryContainer>
            <S.DeliveryTime>{restaurant.deliveryTime} min</S.DeliveryTime>
            <S.ShippingPrice>Frete R$ {restaurant.shipping.toFixed(2).replace(".", ",")}</S.ShippingPrice>
          </S.DeliveryContainer>
        </S.CardContainer>
    )} 
    
    else if (selectedCategory === "") {
      return (
        <S.CardContainer key={restaurant.id} onClick={() => chooseRestaurant(restaurant.id)}>
          <S.ImageSize src={restaurant.logoUrl} alt="imagem logomarca" />
          <S.RestaurantName>{restaurant.name}</S.RestaurantName>
          <S.DeliveryContainer>
            <S.DeliveryTime>{restaurant.deliveryTime} min</S.DeliveryTime>
            <S.ShippingPrice>Frete R$ {restaurant.shipping.toFixed(2).replace(".", ",")}</S.ShippingPrice>
          </S.DeliveryContainer>
        </S.CardContainer>
      )}
    })

  const renderActiveOrder = () => {
    if (activeOrder && activeOrder !== null && isLoading === false) {
      return (
        <S.SnackOrders>
          <h3>Pedido em andamento</h3>
          <p>{activeOrder.restaurantName}</p>
          <p><b>SUBTOTAL R$</b>{activeOrder.totalPrice}</p>
        </S.SnackOrders>
    )}
  }

  const onChangeCategory = (event) => {
    setSelectedCategory(event.target.value)
  }

  const chooseRestaurant = (param) => {
    navigate(`/feed/restaurante/${param}`)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("page")
    localStorage.removeItem("restaurantId")
    setIsLoading(true)
    navigate("/") 
  }

  return (
    <div>
      <S.Header>
        <p></p>
        <h3>Feed</h3>
        <S.ImgLogout onClick={() => logout()} src={exitIcon} alt="icone de sair"/>
      </S.Header>
      <S.InputContainer>
        <TextField
          id="outlined-basic"
          label="Restaurante"
          variant="outlined"
          helperText=" "
          size="small"
          placeholder="Digite o nome de um restaurante"
          value={selectedCategory}
          onChange={onChangeCategory}
        />
      </S.InputContainer>

      <S.FoodContainer>
        {isLoading === false && renderTypesOfFood}
      </S.FoodContainer>

      <S.ContainerRestaurants>
        {isLoading === true ? (<DivLoader><CircularProgress/></DivLoader>) : (renderRestaurants)}
      </S.ContainerRestaurants>
      {renderActiveOrder()}
      <Footer/>
    </div>
  )}

export default Feed;
