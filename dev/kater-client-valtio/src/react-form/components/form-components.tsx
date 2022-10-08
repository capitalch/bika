import { TextField, Typography } from '@mui/material'
import { If, Then } from 'react-if'
import { FormComponentType } from '../interfaces'
import { validateItem } from '../react-form'
import { ItemErrors } from './item-errors'

const formComponents: FormComponentType = {
    TextMaterial: ({ item, store }: any) => {
        // const errorString = store[item.name].errors.value.toString()
        const errors = store[item.name].errors.value
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
                    value={store[item.name].data.value}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    // helperText={store.errors[item.name].required.value}
                    // helperText={errorString}
                    helperText={<ItemErrors errors={errors} />}
                />
            </>
        )

        function handleOnBlur() {
            validateItem(item, store)
        }

        function handleOnChange(e: any) {
            store[item.name].data.value = e.target.value
            validateItem(item, store)
        }
    },
}

export { formComponents }
