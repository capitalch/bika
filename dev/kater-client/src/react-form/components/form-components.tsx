import { FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField, Typography } from '@mui/material'
import { minWidth } from '@mui/system'
import { If, Then } from 'react-if'
import { FormComponentType, JsonFormComponentParmType } from '../interfaces'
import { validateItem } from '../react-form'
import { ItemErrors } from './item-errors'

const formComponents: FormComponentType = {

    SelectCommon: ({ item, store }: JsonFormComponentParmType) => {
        const errors = store[item.name].errors.value
        return (
            <Typography sx={item.sx }>
                <Typography variant='body2'>{item.label}</Typography>
                <select style={{padding: 4, marginTop:3}}
                    onChange={handleOnChange}
                    value={store[item.name].data.value}>
                    {
                        item.options && item.options.map((option: any, index: number) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>
                <ItemErrors errors={errors} />
            </Typography>
        )

        function handleOnChange(e: any) {
            store[item.name].data.value = e.target.value
            validateItem(item, store)
            if (item.onChange) {
                item.onChange(e)
            }
        }
    },

    SelectMaterial: ({ item, store }: JsonFormComponentParmType) => {
        const errors = store[item.name].errors.value
        return (
            <FormControl sx={item.sx || { m: 2, minWidth: 120 }}>
                <InputLabel sx={{ mt: -1 }} id='abc'>{item.label}</InputLabel>
                <Select
                    autoWidth={true}
                    error={errors && (errors.length > 0)}
                    labelId='abc'
                    label={item.label}
                    size='small'
                    onChange={handleOnChange}
                    value={store[item.name].data.value}>
                    {
                        item.options && item.options.map((option: any, index: number) => (
                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                        ))
                    }
                </Select>
                <ItemErrors errors={errors} />
            </FormControl>
        )

        function handleOnChange(e: any) {
            store[item.name].data.value = e.target.value
            validateItem(item, store)
            if (item.onChange) {
                item.onChange(e)
            }
        }
    },

    TextMaterial: ({ item, store }: JsonFormComponentParmType) => {
        const errors = store[item.name].errors.value
        return (
            <>
                <TextField
                    error={errors && (errors.length > 0)}
                    helperText={<ItemErrors errors={errors} />}
                    label={
                        <>
                            <If condition={item.label}>
                                <Then>
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
                                </Then>
                            </If>

                        </>
                    }
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    size="small"
                    sx={item?.sx || undefined}
                    value={store[item.name].data.value}
                    variant="outlined"
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

/* <If condition={item.label}>
                    <Then>
                        <Typography component='span' variant='body2'>{item.label}</Typography>
                    </Then>
                </If>  */