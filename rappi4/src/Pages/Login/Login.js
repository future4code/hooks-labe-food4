import useForm from "../../Hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../Constants/url"
import { useNavigate, Link } from "react-router-dom";
// imports de estilização
import { Button, TextField } from "@mui/material";
import { FormLoginContainer, Header, Footer, DivImg } from "./Styles";
import logo from "../../Assets/logo-future-eats-invert.png"

const Login = () => {
    const navigate = useNavigate()
    const [form, onChange, cleanFields] = useForm({email: "", password: ""})

    const postLogin = (event) => {
        event.preventDefault()
        axios
            .post(`${BASE_URL}login`, form)

            .then((response) => {
                localStorage.setItem("token", response.data.token)
                
                if (response.data.user.hasAddress === true) { navigate("/feed") }
                
                else { navigate("/cadastro-de-endereco") }
                
                cleanFields()
            })
            
            .catch((error) => {
                console.log(error.message)
                cleanFields()
            })}

            

    return (
        <div>
            
            <DivImg>
            <img src={logo}/>
            </DivImg>
            <Header>Entrar</Header>
            < FormLoginContainer onSubmit={postLogin}>
                <TextField 
               
                    label = "Email"
                    placeholder="Digite seu e-mail" 
                    margin="normal"
                    name="email" 
                    value={form.email} 
                    onChange={onChange}
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Deve possuir formato de e-mail"
                    required 
                />
                
                <TextField 
                    label = "Senha"
                    placeholder="Digite sua senha"
                    margin="normal"
                    helperText=" "  
                    name="password"
                    value={form.password} 
                    onChange={onChange}
                    type="password"
                    required 
                />
                <Button type="submit" color="primary" variant="contained">Entrar</Button>
            </FormLoginContainer>
            
            <Footer>Não possui cadastro?<Link to="/cadastro"> Clique aqui</Link></Footer>
        </div>
    )
}

export default Login;
