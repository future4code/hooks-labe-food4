import styled from "styled-components";

export const Header = styled.header`
    display: flex;
    align-items: center;
    padding:15px;
    justify-content: center;
    border-bottom: 1px solid #d3d3d3;
`

export const FoodSearch = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  font-size: 16px;
  padding: 16px 8px 16px 17px;
`;

export const ImageSize = styled.img`
  display: flex;
  width: 100%;
  height: 200px;
  margin-bottom: 5px;
  border-radius:15px 15px 0px 0px;
  
`;

export const CardContainer = styled.div`
  display:flex;
  flex-direction: column;
  width:90%;
  margin:auto;
  border-radius: 15px;
  border: 1px solid #b8b8b8;
  margin-top:10px;
`

export const FoodContainer = styled.div`
  display: inline-block;
  padding: 5px;
  width: 87px;
  height: 18px;
  margin: 0 8px;
  font-family: Roboto;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  text-align: center;
  color: #000;
`;


export const RestaurantName = styled.h3`
  height: 18px;
  margin: 12px 16px 4px;
  font-family: Roboto;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  width: 296px;
  color: #e86e5a;
`;

export const DeliveryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom:5px;
`;
export const DeliveryTime = styled.p`
  width: 148px;
  height: 18px;
  margin: 4px 8px 0 16px;
  font-weight: normal;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.39px;
  line-height: normal;
  color:#b8b8b8;
`;

export const ShippingPrice = styled.p`
  width: 140px;
  height: 18px;
  margin: 4px 16px 0 8px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  text-align: right;
  color:#b8b8b8;
`;

export const SnackOrders = styled.div`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  position: sticky;
  bottom: 0;
  background-color: #e86e5a;
  border-top: 1px solid #c8c8c8;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:90%;
  margin:auto;
  margin-top:10px;
`;
