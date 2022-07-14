import useForm from "../../Hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../Constants/url"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
    const navigate = useNavigate()
    const [form, onChange, cleanFields] = useForm({name: "", email: "", cpf: "", password: ""})
    const [secondPass, setSecondPass] = useState("")

    const postSignUp = () => {
        axios
            .post(`${BASE_URL}signup`, form)
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                cleanFields() 
            })
            .catch((error) => {
                console.log(error.message)
    })}

    const onMatch2Pass = (event) => {
        setSecondPass(event.target.value)
    } 

    const confirmPassword = (event) => {
        event.preventDefault()
        if (form.password === secondPass) {
            postSignUp()
            navigate("/cadastro-de-endereco")
        }
        else {
            alert("As senhas não são identicas")
    }}

    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={confirmPassword}>
                <input
                    placeholder="Nome e sobrenome"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                />
                <input
                    placeholder="email@email.com"
                    name="email" 
                    value={form.email} 
                    onChange={onChange}
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Deve possuir formato de e-mail"
                    required 
                />
                <input
                    placeholder="000.000.000-00"
                    name="cpf"
                    value={form.cpf}
                    onChange={onChange}
                    pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"
                    title="Deve possuir um CPF válido"
                    required
                />
                <input
                    placeholder="Mínimo 6 caracteres"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    type="password"
                    pattern="[0-9a-zA-Z]{6,}"
                    title="Senha inválida"
                    required
                />
                <input
                    placeholder="Confirme a senha anterior"
                    type="password"
                    onChange={onMatch2Pass}
                    value={secondPass}
                />
                <button>Criar</button>
            </form>
        </div>
    )
}

export default SignUp;