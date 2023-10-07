import { Alert, Snackbar} from "@mui/material"
import { red } from '@mui/material/colors'

const Snack = ({isOpen, handleClose, children}) => {
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert 
            severity="success" 
            sx={{color: red}}
            > {children}</Alert>
        </Snackbar>
    )
}
export default Snack
