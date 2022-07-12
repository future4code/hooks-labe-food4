import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login/>}/>
                <Route />
                <Route/>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;