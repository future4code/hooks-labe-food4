import useForm from "../../Hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../Constants/url"
import { useNavigate } from "react-router-dom";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { Button, TextField } from "@mui/material";
import {FormAddressContainer, InputAddressContainer, H3Address} from './styles'

const AddressSignUp = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const [form, onChange, cleanFields] = useForm({street: "", number: "", neighbourhood: "", city: "", state: "", complement: ""})
    
    const putAddress = (event) => {
        event.preventDefault()
        const headers = {
            headers : {
                auth : localStorage.getItem("token")
            }}
        
        axios 
            .put(`${BASE_URL}address`, form, headers)
            .then((response) => {
                if (window.confirm("Endereço cadastrado com sucesso!")) { 
                    localStorage.setItem("token", response.data.token)
                    navigate("/feed")

                }
                cleanFields()
            })
            
            .catch((error) => {
                console.log(error.message)
                alert("Algo deu errado :(")
                cleanFields()   
            })
    }

    return (
        <div>
            <H3Address>Meu Endereço</H3Address>
            <FormAddressContainer onSubmit={putAddress}>
                
                
            <TextField id="outlined-basic" label="Rua / Av.*" variant="outlined" helperText=" " size="small"/>
            <TextField id="outlined-basic" label="Número*" variant="outlined" helperText=" " size="small"/>
            <TextField id="outlined-basic" label="Complemento" variant="outlined" helperText=" " size="small"/>
            <TextField id="outlined-basic" label="Bairro*" variant="outlined" helperText=" " size="small"/>
            <TextField id="outlined-basic" label="Cidade*" variant="outlined" helperText=" " size="small"/>
            <TextField id="outlined-basic" label="Estado*" variant="outlined" helperText=" " size="small"/>


                <Button type="submit" color="primary" variant="contained">Enviar</Button>
            </FormAddressContainer>
        </div>
    )
}

export default AddressSignUp;
