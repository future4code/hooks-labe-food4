import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const AlertSuccess = () => {
    return (
        <div>
            <Alert variant="filled" color="primary">
                <AlertTitle><b>Sucesso</b></AlertTitle>
                Produto <b>adicionado</b> ao carrinho!!!
            </Alert>
        </div>
    )
}

export default AlertSuccess;