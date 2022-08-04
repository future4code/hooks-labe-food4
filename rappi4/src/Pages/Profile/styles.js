import styled from 'styled-components'

// Estilização Header
export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-bottom: 1px solid #d3d3d3;
`
// Estilização Informações usuário
export const DivInfos = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding: 15px;
`
export const DivImg  = styled.div`
    display: flex;
    justify-content: space-between;
`
// Estilização Endereço
export const DivEndereco = styled.div`
    background-color: #eeeeee;
    margin-bottom: 15px;
    padding: 15px;
`
export const PEndereco = styled.p`
    color: #b8b8b8;
    margin-bottom: 10px; 
`
// Estilização Histórico de pedidos
export const DivTitleHist = styled.div`
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 15px;
` 
export const PTitle = styled.h3`
    border-bottom: 1px solid #000000;
    padding-bottom: 5px;
    font-weight: normal;
`
export const Ordens = styled.div`
    border: 1px solid grey;
    width: 348px;
    height: 85px;
    margin: 7px 0 0;
    border-radius: 8px;
    padding: 15px;
`
export const H3RestaurantName = styled.h3`
    color: #e86e5a;
    font-weight: normal;
    margin-bottom: 10px;
`
export const DivRenderOrders = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-bottom: 55px;
`