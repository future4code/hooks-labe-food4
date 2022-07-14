import useForm from "../../Hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../Constants/url"
import { useNavigate } from "react-router-dom";

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
            <h1>Login</h1>
            <form onSubmit={postLogin}>
                <input 
                    placeholder="Digite seu e-mail" 
                    name="email" 
                    value={form.email} 
                    onChange={onChange}
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Deve possuir formato de e-mail"
                    required 
                />
                <input 
                    placeholder="Digite sua senha" 
                    name="password"
                    value={form.password} 
                    onChange={onChange}
                    type="password"
                    required 
                />
                <button>Entrar</button>
            </form>
            <button onClick={() => navigate("/cadastro")}>Não possui cadastro? Clique <b>aqui</b></button>
        </div>
    )
}

export default Login;
