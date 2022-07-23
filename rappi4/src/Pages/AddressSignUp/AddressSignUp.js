import useForm from "../../Hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../Constants/url"
import { useNavigate } from "react-router-dom";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { Button, TextField } from "@mui/material";
import {FormAddressContainer, Header} from './Styles'
import GlobalStateContext from "../../Global/GlobalStateContext";
import { useContext } from "react";

const AddressSignUp = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const {alertSuccess, alertError} = useContext(GlobalStateContext)
    const [form, onChange, cleanFields] = useForm({street: "", number: "", neighbourhood: "", city: "", state: "", complement: ""})
    
    const putAddress = (event) => {
        event.preventDefault()
        const headers = {
            headers : {auth : localStorage.getItem("token")}}
        
        axios 
            .put(`${BASE_URL}address`, form, headers)
            .then((response) => {
                alertSuccess("Conta cadastrada")
                localStorage.setItem("token", response.data.token)
                navigate("/feed")
                cleanFields()
            })
            
            .catch((error) => {
                console.log(error.message)
                alertError("Algo deu  errado na criação da conta :(")
                cleanFields()   
            })
    }

    return (
        <div>
            <Header>
                <h3>Meu Endereço</h3>
            </Header>
            
            <FormAddressContainer onSubmit={putAddress}>
        
                <TextField
                    id="outlined-basic"
                    label="Rua / Av."
                    variant="outlined"
                    helperText=" "
                    size="small"
                    placeholder="Rua / Av." 
                    name="street"
                    value={form.street}
                    onChange={onChange}
                    required 
                />

                <TextField 
                    id="outlined-basic" 
                    label="Número" 
                    variant="outlined" 
                    helperText=" " 
                    size="small"
                    placeholder="Número"
                    name="number"
                    value={form.number} 
                    onChange={onChange}
                    required
                />

                <TextField 
                    id="outlined-basic" 
                    label="Complemento" 
                    variant="outlined" 
                    helperText=" " 
                    size="small"
                    placeholder="Apartamento / Bloco"
                    name="complement"
                    value={form.complement} 
                    onChange={onChange}
                />

                <TextField 
                    id="outlined-basic" 
                    label="Bairro" 
                    variant="outlined" 
                    helperText=" " 
                    size="small"
                    placeholder="Bairro"
                    name="neighbourhood"
                    value={form.neighbourhood} 
                    onChange={onChange}
                    required
                />

                <TextField 
                    id="outlined-basic" 
                    label="Cidade" 
                    variant="outlined" 
                    helperText=" " 
                    size="small"
                    placeholder="Cidade"
                    name="city"
                    value={form.city} 
                    onChange={onChange}
                    required
                />
                
                <TextField 
                    id="outlined-basic" 
                    label="Estado" 
                    variant="outlined" 
                    helperText=" " 
                    size="small"
                    placeholder="Estado"
                    name="state"
                    value={form.state} 
                    onChange={onChange}
                    required
                />

                <Button type="submit" color="primary" variant="contained">Enviar</Button>
            </FormAddressContainer>
        </div>
    )
}

export default AddressSignUp;
