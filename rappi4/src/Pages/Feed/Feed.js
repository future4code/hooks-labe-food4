import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../../Global/GlobalStateContext";
import Footer from "../../Constants/Footer";
import {
  ImageSize,
  FoodContainer,
  DivTeste,
  // FoodSearch,
  Title,
  RestaurantName,
  DeliveryContainer,
  DeliveryTime,
  ShippingPrice,
} from "./styles";
import { TextField } from "@mui/material";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  useProtectedPage();
  const navigate = useNavigate();
  const { restaurants, getRestaurants, activeOrder, getActiveOrder } =
    useContext(GlobalStateContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getRestaurants();
  }, []);
  useEffect(() => {
    getActiveOrder();
  }, []);

  const renderTypesOfFood = restaurants.map((type, index) => {
    return (
      <FoodContainer key={index}>
        <h4 onClick={() => setSelectedCategory(type.category)}>
          {type.category}
        </h4>
      </FoodContainer>
    );
  });

  const renderRestaurants = restaurants.map((restaurant) => {
    if (
      restaurant.category === selectedCategory ||
      restaurant.name === selectedCategory
    ) {
      return (
        <div
          key={restaurant.id}
          onClick={() => chooseRestaurant(restaurant.id)}
        >
          <ImageSize src={restaurant.logoUrl} alt="imagem logomarca" />
          <RestaurantName>{restaurant.name}</RestaurantName>

          <DeliveryContainer>
            <p>{restaurant.deliveryTime} min</p>
            <p>Frete R$ {restaurant.shipping.toFixed(2).replace(".", ",")}</p>
          </DeliveryContainer>
        </div>
      );
    } else if (selectedCategory === "") {
      return (
        <div
          key={restaurant.id}
          onClick={() => chooseRestaurant(restaurant.id)}
        >
          <ImageSize src={restaurant.logoUrl} alt="imagem logomarca" />
          <RestaurantName>{restaurant.name}</RestaurantName>
          <DeliveryContainer>
            <DeliveryTime>{restaurant.deliveryTime} min</DeliveryTime>
            <ShippingPrice>
              Frete R$ {restaurant.shipping.toFixed(2).replace(".", ",")}
            </ShippingPrice>
          </DeliveryContainer>
        </div>
      );
    }
  });

  const renderActiveOrder = () => {
    if (activeOrder && activeOrder !== null) {
      return (
        <DivTeste>
          <h3>Pedido em andamento</h3>
          <p>{activeOrder.restaurantName}</p>
          <p>
            <b>SUBTOTAL R$:</b> {activeOrder.totalPrice}
          </p>
        </DivTeste>
      );
    }
  };

  const onChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const chooseRestaurant = (param) => {
    navigate(`/feed/restaurante/${param}`);
  };

  return (
    <div>
      <Title>Feed</Title>
     <div>
      <TextField
        id="outlined-basic"
        label="Restaurante"
        variant="outlined"
        helperText=" "
        size="medium"
        placeholder="Restaurante"
        value={selectedCategory}
        onChange={onChangeCategory}
      />
      </div>
    

      {renderTypesOfFood}
      {renderRestaurants}
      {renderActiveOrder()}
      <Footer />
    </div>
  );
};

export default Feed;
