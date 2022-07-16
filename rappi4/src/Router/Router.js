import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login"
import SignUp from "../Pages/SignUp/SignUp"
import AddressSignUp from "../Pages/AddressSignUp/AddressSignUp"
import Feed from "../Pages/Feed/Feed"
import RestaurantDetail from "../Pages/RestaurantDetail/RestaurantDetail"
import Cart from "../Pages/Cart/Cart"
import Profile from "../Pages/Profile/Profile"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path="/cadastro" element={<SignUp/>}/>
                <Route path="/cadastro-de-endereco" element={<AddressSignUp/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/feed/restaurante/:id" element={<RestaurantDetail/>}/>
                <Route path="/carrinho" element={<Cart/>}/>
                <Route path="/perfil" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;