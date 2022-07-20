import styled from "styled-components";

// Estilização Header
export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-bottom: 1px solid #d3d3d3;
`
// Estilização Endereço
export const ContainerAddress = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 76px;
    background-color: #eeeeee;
`
export const DivInfos = styled.div`
    padding: 15px;
`
export const H4Infos = styled.h4`
    color: #b8b8b8;
    font-weight: normal;
    margin-bottom: 5px;
`
// Estilização Endereço do restaurante
export const ContainerRestaurantAddress = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 76px;
`
export const H4InfosRestarant = styled.h4`
    color: #e86e5a;
    margin-top: 10px;
`
export const PInfosRestaurant = styled.p`
    color: #b8b8b8;
    padding-top: 3px;
`
// Estilização Produtos
export const ContainerProducts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-top: 15px;
`
export const DivProducts = styled.div`
    width: 95%;
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
    gap: 10px;
    margin-left: 5px; 
`
export const DivBtn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin: 0px 5px 5px 0px;
`
export const DivBtnQtd = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    height: 70%;
    gap: 5px;
    padding: 10px;
`
export const BtnQtd = styled.button`
    width: 20px;
    border: none;
    color: white;
    padding: 3px;
    border-radius: 10px;
    background-color: #e86e5a;
    font-weight: bold;
`
export const PProductName = styled.p`
    color: #e86e5a;
`
export const PProduct = styled.p`
    color: #b8b8b8;
`
// Estilização Subtotal
export const ContainerSubtotal = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 76px;
    margin-top: 5px;
`
export const DivSubtotal = styled.div`
    padding: 15px;
    display: flex;
    align-items: end;
`
export const ContainerSubt = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    gap: 10px;
`
export const H3Subt = styled.h3`
    color: #e86e5a;
`
// Estilização Forma de pagamento
export const ContainerPayment = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
    height: 76px;
    padding: 15px;
    gap: 10px;
`
export const H3Payment = styled.h3`
    border-bottom: 1px solid #000000;
    padding-bottom: 5px;
`
