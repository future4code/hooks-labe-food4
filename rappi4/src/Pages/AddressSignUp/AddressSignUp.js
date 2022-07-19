import useForm from "../../Hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../Constants/url"
import { useNavigate } from "react-router-dom";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { Button } from "@mui/material";
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
                <InputAddressContainer
                    placeholder="Rua / Av." 
                    name="street" 
                    value={form.street} 
                    onChange={onChange}
                    required 
                />  
                <InputAddressContainer
                    placeholder="Número"
                    name="number"
                    value={form.number} 
                    onChange={onChange}
                    required
                />
                
                <InputAddressContainer
                    placeholder="Apartamento / Bloco"
                    name="complement"
                    value={form.complement} 
                    onChange={onChange}
                    required
                />
                
                <InputAddressContainer
                    placeholder="Bairro"
                    name="neighbourhood"
                    value={form.neighbourhood} 
                    onChange={onChange}
                    required
                />
                
                <InputAddressContainer
                    placeholder="Cidade"
                    name="city"
                    value={form.city} 
                    onChange={onChange}
                    required
                />
                
                <InputAddressContainer
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
