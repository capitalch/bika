import { TextField } from "@mui/material"
import { FormComponentType } from "../interfaces"

const formComponents: FormComponentType = {

    TextMaterial: ({item, store}:any) => {
        return (<>
            <TextField variant='outlined'
                sx={{mt:2}}
                label={item.label}
                size="small" 
                value = {store[item.name].value}
                onChange={handleOnChange}
                />
        </>)

        function handleOnChange(e:any){
            store[item.name].value = e.target.value
        }
    }
}

export { formComponents }