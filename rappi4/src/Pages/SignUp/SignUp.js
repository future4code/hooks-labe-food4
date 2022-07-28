import useForm from "../../Hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../Constants/url"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import back from "../../Assets/back.png"
import GlobalStateContext from "../../Global/GlobalStateContext";
import { CircularProgress } from "@mui/material";
// imports de estilização
import { Button, TextField } from "@mui/material";
import * as S from './styles'
import logo from "../../Assets/logo-future-eats-invert.png"

const SignUp = () => {
    const navigate = useNavigate()
    const [form, onChange, cleanFields] = useForm({name: "", email: "", cpf: "", password: ""})
    const [secondPass, setSecondPass] = useState("")
    const {alertSuccess, alertError, isLoading, alertWarning, setIsLoading} = useContext(GlobalStateContext)

    const postSignUp = () => {
        axios
            .post(`${BASE_URL}signup`, form)
            .then((response) => {
                alertSuccess("Conta cadastrada com sucesso")
                setIsLoading(false)
                localStorage.setItem("token", response.data.token)
                navigate("/cadastro-de-endereco")
                cleanFields() 
            })
            .catch((error) => {
                alertError("Algo deu errado :(")
                console.log(error.message)
    })}

    const onMatch2Pass = (event) => {
        setSecondPass(event.target.value)
    } 

    const confirmPassword = (event) => {
        event.preventDefault()
        if (form.password === secondPass) {
            postSignUp()
        }
        else {
            alertWarning("As senhas não são idênticas")
    }}

    return (
        <div>
            <S.Header>
            <S.BackImgHeader onClick={() => navigate(-1)} src={back}/>
            </S.Header>

            <S.DivImg>
                <img src={logo} alt="logo rappi4"/>
            </S.DivImg>

            <S.FormLoginContainer onSubmit={confirmPassword}>
                <TextField 
                    label="Nome"
                    margin="normal"
                    placeholder="Nome e sobrenome"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                />
                <TextField 
                    label="E-mail"
                    placeholder="email@email.com"
                    name="email" 
                    margin="normal"
                    value={form.email} 
                    onChange={onChange}
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Deve possuir formato de e-mail"
                    required 
                />
                <TextField
                    label="CPF" 
                    placeholder="000.000.000-00"
                    margin="normal"
                    name="cpf"
                    value={form.cpf}
                    onChange={onChange}
                    inputProps={{ inputMode: 'numeric', pattern: '([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})'}}
                    title="Deve possuir um CPF válido"
                    required
                />
                <TextField 
                    label="Senha"
                    placeholder="Mínimo 6 caracteres"
                    name="password"
                    margin="normal"
                    value={form.password}
                    onChange={onChange}
                    type="password"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9a-zA-Z]{6,}'}}
                    title="Senha inválida"
                    required
                />
                <TextField
                    label="Senha" 
                    placeholder="Confirme a senha anterior"
                    margin="normal"
                    helperText=" "  
                    type="password"
                    onChange={onMatch2Pass}
                    value={secondPass}
                />
                <Button type="submit" color="primary" variant="contained">{isLoading === false ? <CircularProgress size={24} color="inherit"/>: <p>Criar</p>}</Button>
            </S.FormLoginContainer>
        </div>
    )
}

export default SignUp;