import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { If, Then } from 'react-if'
import { FormComponentType, JsonFormComponentParmType } from '../interfaces'
import { validateItem } from '../react-form'
import { ItemErrors } from './item-errors'

const formComponents: FormComponentType = {

    CheckBoxMaterial: ({ item, store }: JsonFormComponentParmType) => {
        let val = store[item.name].data.value  //? true : false
        val = !!val
        // val = ((val === '') || (val === null) || (val === undefined)) ? false : true
        return (
            <FormControlLabel sx={item.sx || undefined}
                control={
                    <Checkbox
                        checked={val}
                        name={item.name}
                        onChange={handleOnChange}

                        value={val}
                    />
                }
                label={item.label}
            />
        )

        function handleOnChange(e: any) {
            store[item.name].data.value = e.target.checked
            if (item.onChange) {
                item.onChange(e)
            }
        }
    },

    SelectCommon: ({ item, store }: JsonFormComponentParmType) => {
        const errors = store[item.name].errors.value
        return (
            <Typography sx={item.sx}>
                <Typography variant='body2'>{item.label}</Typography>
                <select style={{ padding: 4, marginTop: 3 }}
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
            <FormControl sx={item.sx || { minWidth: 120 }}>
                <InputLabel sx={{ mt: -1 }} id='abc'>{item.label}</InputLabel>
                <Select
                    autoWidth={true}
                    // error={errors && (errors.length > 0)}
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
                    // error={errors && (errors.length > 0)}
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
