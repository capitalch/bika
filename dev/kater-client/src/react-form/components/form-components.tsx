import { TextField } from "@mui/material"
import { FormComponentType } from "../interfaces"

const formComponents: FormComponentType = {

    TextMaterial: ({ item, store }: any) => {
        return (<>
            <TextField variant='outlined'
                sx={item?.sx || undefined}
                label={item.label}
                size="small"
                value={store[item.name].value}
                onChange={handleOnChange}
                helperText={store.errors[item.name].value}
            />
        </>)

        function handleOnChange(e: any) {
            store[item.name].value = e.target.value
        }
    }
}

export { formComponents }