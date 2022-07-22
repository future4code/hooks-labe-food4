import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../../Global/GlobalStateContext";
import Footer from "../../Constants/Footer";
import {
  ImageSize, FoodContainer,SnackOrders,
  RestaurantName,DeliveryContainer,
  DeliveryTime,ShippingPrice,
  InputContainer,CardContainer,
  Header, ContainerRestaurants, PChoosed
} from "./styles";
import { TextField } from "@mui/material";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  useProtectedPage();
  const navigate = useNavigate();
  const { restaurants, getRestaurants, activeOrder, getActiveOrder } = useContext(GlobalStateContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {getRestaurants()}, []);
  useEffect(() => {getActiveOrder()}, []);

  const renderTypesOfFood = restaurants.map((type, index) => {
    if (type.category === selectedCategory) {
      return (<div><PChoosed onClick={() => setSelectedCategory(type.category)}>{type.category}</PChoosed></div>)}
    
    else {return(<div><p onClick={() => setSelectedCategory(type.category)}>{type.category}</p></div>)}
  })

  const renderRestaurants = restaurants.map((restaurant) => {
    if (restaurant.category === selectedCategory || restaurant.name === selectedCategory) {
      return (
        <CardContainer key={restaurant.id} onClick={() => chooseRestaurant(restaurant.id)}>
          <ImageSize src={restaurant.logoUrl} alt="imagem logomarca" />
          <RestaurantName>{restaurant.name}</RestaurantName>
          <DeliveryContainer>
            <DeliveryTime>{restaurant.deliveryTime} min</DeliveryTime>
            <ShippingPrice>Frete R$ {restaurant.shipping.toFixed(2).replace(".", ",")}</ShippingPrice>
          </DeliveryContainer>
        </CardContainer>
      )} 
    
    else if (selectedCategory === "") {
      return (
        <CardContainer key={restaurant.id} onClick={() => chooseRestaurant(restaurant.id)}>
          <ImageSize src={restaurant.logoUrl} alt="imagem logomarca" />
          <RestaurantName>{restaurant.name}</RestaurantName>
          <DeliveryContainer>
            <DeliveryTime>{restaurant.deliveryTime} min</DeliveryTime>
            <ShippingPrice>Frete R$ {restaurant.shipping.toFixed(2).replace(".", ",")}</ShippingPrice>
          </DeliveryContainer>
        </CardContainer>
      )}
  })

  const renderActiveOrder = () => {
    if (activeOrder && activeOrder && activeOrder !== null) {
      return (
        <SnackOrders>
          <h3>Pedido em andamento</h3>
          <p>{activeOrder.restaurantName}</p>
          <p><b>SUBTOTAL R$</b>{activeOrder.totalPrice}</p>
        </SnackOrders>
    )}
  }

  const onChangeCategory = (event) => {
    setSelectedCategory(event.target.value)
  }

  const chooseRestaurant = (param) => {
    navigate(`/feed/restaurante/${param}`)
  }

  return (
    <div>
      <Header>
        <h3>Feed</h3>
      </Header>
      <InputContainer>
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
      </InputContainer>
      
      <FoodContainer>
          {renderTypesOfFood}
      </FoodContainer>
      
      <ContainerRestaurants>
        {renderRestaurants}
      </ContainerRestaurants>
      {renderActiveOrder()}
      <Footer/>
    </div>
  )
}

export default Feed;
