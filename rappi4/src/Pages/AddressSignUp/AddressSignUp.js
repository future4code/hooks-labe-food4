import useForm from "../../Hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../Constants/url"
import { useNavigate } from "react-router-dom";
import { useProtectedPage } from "../../Hooks/useProtectedPage";

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
            <h1>AdressSignUp</h1>
            <form onSubmit={putAddress}>
                <input
                    placeholder="Digite o nome da sua rua" 
                    name="street" 
                    value={form.street} 
                    onChange={onChange}
                    required 
                />  
                <input
                    placeholder="Digite o número da sua casa"
                    name="number"
                    value={form.number} 
                    onChange={onChange}
                    required
                />
                
                <input
                    placeholder="Digite o complemento"
                    name="complement"
                    value={form.complement} 
                    onChange={onChange}
                    required
                />
                
                <input
                    placeholder="Digite o bairro"
                    name="neighbourhood"
                    value={form.neighbourhood} 
                    onChange={onChange}
                    required
                />
                
                <input
                    placeholder="Digite a sua cidade"
                    name="city"
                    value={form.city} 
                    onChange={onChange}
                    required
                />
                
                <input
                    placeholder="Digite o seu estado"
                    name="state"
                    value={form.state} 
                    onChange={onChange}
                    required
                />
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default AddressSignUp;
