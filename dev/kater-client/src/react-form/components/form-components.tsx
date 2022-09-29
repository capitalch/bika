import { TextField } from "@mui/material"
import { FormComponentType } from "../interfaces"

const formComponents: FormComponentType = {

    TextMaterial: () => {
        return (<>
            <TextField variant='outlined'
                sx={{mt:2}}
                size="small" />
        </>)
    }
}

export { formComponents }