import axios from "axios"
import { BASE_URL } from "../../Constants/url"
import useForm from "../../Hooks/useForm"
import { useProtectedPage } from "../../Hooks/useProtectedPage"
import Footer from "../../Constants/Footer"

const UpdateProfile = () => {
    useProtectedPage()
    const [form, onChange, cleanFields] = useForm({name: "", email: "", cpf: ""})

    const updateProfile = (event) => {
        event.preventDefault()
        const headers = {headers : {auth : localStorage.getItem("token")}}

        axios
            .put(`${BASE_URL}profile`, form, headers )
            .then(() => {
                alert("Informações atualizadas")
                cleanFields()
            })

            .catch((error) => {
                console.log(error)
            })
    }
    
    console.log(form)

    return (
        <div>
            <h1>Editar perfil</h1>
            <form onSubmit={updateProfile}>
                <input
                    placeholder="Digite seu nome"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                />
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
                    placeholder="000.000.000-00"
                    name="cpf"
                    value={form.cpf}
                    onChange={onChange}
                    pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"
                    title="Deve possuir um CPF válido"
                    required
                />
                <button>Salvar</button>
            </form>
            <Footer/>
        </div>
    )
}

export default UpdateProfile;