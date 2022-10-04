import { TextField, Typography } from '@mui/material'
import { If, Then } from 'react-if'
import { FormComponentType } from './interfaces'
import { validateItem } from './react-form'

const formComponents: FormComponentType = {
    TextMaterial: ({ item, store }: any) => {
        const errorString = Object.values(store.errors[item.name]).toString()
        return (
            <>
                <TextField
                    variant="outlined"
                    sx={item?.sx || undefined}
                    label={
                        <>
                            <Typography component="span">
                                {item.label}
                            </Typography>
                            <If
                                condition={
                                    item.validations &&
                                    item.validations.includes('required')
                                }>
                                <Then>
                                    <Typography component="span" color="red">
                                        {' *'}
                                    </Typography>
                                </Then>
                            </If>
                        </>
                    }
                    size="small"
                    value={store[item.name].value}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    // helperText={store.errors[item.name].value}
                    helperText={errorString}
                />
            </>
        )

        function handleOnBlur() {
            // validateItem(item, store)
        }

        function handleOnChange(e: any) {
            store[item.name].value = e.target.value
            // validateItem(item, store)
        }
    },
}

export { formComponents }
