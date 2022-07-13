import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login"
import SignUp from "../Pages/SignUp/SignUp"
import AddressSignUp from "../Pages/AddressSignUp/AddressSignUp"
import Feed from "../Pages/Feed/Feed"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path="/cadastro" element={<SignUp/>}/>
                <Route path="/cadastro-de-endereco" element={<AddressSignUp/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route/>
                <Route/>
                <Route/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;