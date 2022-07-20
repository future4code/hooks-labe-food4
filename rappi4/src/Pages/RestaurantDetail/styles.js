import styled from 'styled-components'

// Estilização Div body do arquivo
export const DivBody = styled.div`
    display: flex;
    flex-direction: column;
`
// Estilização Header
export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #d3d3d3;
`
export const BackImgHeader = styled.img`
    width: 23px;
    height: 24px;
    cursor: pointer;
`
// Estilização Container infos do restaurante
export const ContainerInfos = styled.div`
    height: 350px;
    display: flex;
    margin-top: 10px;
    justify-content: center;
`
export const DivInfosRestaurant = styled.div`
    width: 95%;
`
export const ImgInfosRestaurant = styled.img`
    width: 100%;
    height: 70%;
    border-radius: 15px 15px 0px 0px;
`
export const H3InfosRestaurant = styled.h3`
    margin-top: 5px;
    color: #e86e5a;
`
export const PInfosRestaurant = styled.p`
    margin-top: 5px;
    color: #b8b8b8;
`
export const ShippingAndDelivery = styled.div`
    display: flex;
    gap: 14px;
`
// Estilização Container Produtos do restaurante
export const ContainerProducts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`
export const DivProducts = styled.div`
    width: 95%;
    height: 140px;
    display: flex;
    justify-content: space-between;
    border-radius: 15px 15px 0px 15px;
    border: 1px solid #b8b8b8;
`
export const ImgProducts = styled.img`
    width: 40%;
    border-radius: 15px 0px 0px 15px;
`
export const DivInfosProducts = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 5px; 
`
export const DivBtnProducts = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 5px;
    margin-right: 5px;
    width: 85px;
`
export const PRestaurantProducts = styled.p`
    color: #e86e5a;
`
export const H3divProducts = styled.div`
    display: flex;
    width: 95%;
    justify-content: start;
    border-bottom: 1px solid black;
    padding-bottom: 5px;
    margin-top: 10px;
`