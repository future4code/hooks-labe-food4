import axios from "axios"
import { BASE_URL } from "../../Constants/url"
import useForm from "../../Hooks/useForm"
import { useProtectedPage } from "../../Hooks/useProtectedPage"
import Footer from "../../Constants/Footer"
import * as S from "./styles"
import back from "../../Assets/back.png"
import { useNavigate } from "react-router-dom"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import { useContext } from "react"
import GlobalStateContext from "../../Global/GlobalStateContext"

const UpdateProfile = () => {
    useProtectedPage()
    const {alertSuccess, alertError} = useContext(GlobalStateContext)
    const navigate = useNavigate()
    const [form, onChange, cleanFields] = useForm({name: "", email: "", cpf: ""})

    const updateProfile = (event) => {
        event.preventDefault()
        const headers = {headers : {auth : localStorage.getItem("token")}}

        axios
            .put(`${BASE_URL}profile`, form, headers )
            .then(() => {
                alertSuccess("Conta atualizada com sucesso!")
                navigate("/perfil")
                cleanFields()
            })

            .catch((error) => {
                alertError("Algo de errado ocorreu :(")
                console.log(error)
            })
    }
    
    return (
        <div>
            <S.Header>
                <S.BackImgHeader onClick={() => navigate(-1)} src={back}/>
                <h3>Editar perfil</h3>
                <div></div>
            </S.Header>
           
            <S.FormAddressContainer onSubmit={updateProfile}>
                <TextField
                    id="outlined-basic"
                    label="Nome"
                    variant="outlined"
                    helperText=" "
                    size="small"
                    placeholder="Digite seu nome"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                />
                <TextField
                    id="outlined-basic"
                    label="E-mail"
                    variant="outlined"
                    helperText=" "
                    size="small"
                    placeholder="Digite seu e-mail" 
                    name="email" 
                    value={form.email} 
                    onChange={onChange}
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Deve possuir formato de e-mail"
                    required 
                />
                <TextField
                    id="outlined-basic"
                    label="CPF"
                    variant="outlined"
                    helperText=" "
                    size="small"
                    placeholder="000.000.000-00"
                    name="cpf"
                    value={form.cpf}
                    onChange={onChange}
                    inputProps={{ inputMode: 'numeric', pattern: '([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})'}}
                    title="Deve possuir um CPF válido"
                    required
                />
                <Button type="submit" variant="contained">Salvar</Button>
            </S.FormAddressContainer>
            <Footer/>
        </div>
    )
}

export default UpdateProfile;