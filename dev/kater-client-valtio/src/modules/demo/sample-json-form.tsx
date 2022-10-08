import { JsonFormType } from '../../react-form/interfaces'

const sampleJsonForm: JsonFormType = {
    items: [
        {
            // defaultValue:'Sush',
            label: 'Name',
            name: 'personName',
            sx: {
                mt: 2,
            },
            typeName: 'TextMaterial',
            validations: ['email', 'oneSpecialChar', 'required'],
        },
        {
            label: 'Address1',
            name: 'address1',
            sx: {
                mt: 2,
                ml: 1,
            },
            typeName: 'TextMaterial',
            validations: ['required'],
        },
        {
            label: 'Address2',
            name: 'address2',
            sx: {
                mt: 2,
                ml: 1,
            },
            typeName: 'TextMaterial',
            validations: ['required'],
        },
        {
            label: 'Options',
            name: 'options',
            options: [
                { label: '---select---', value: '' },
                { label: 'one', value: '1' },
                { label: 'two', value: '2' },
            ],
            sx: { m: 2, minWidth: 120 },
            typeName: 'SelectMaterial',
            validations: ['required'],
        },
        {
            label: 'Options common',
            name: 'optionsCommon',
            options: [
                { label: '---select---', value: '' },
                { label: 'one', value: '1' },
                { label: 'two', value: '2' },
            ],
            sx: { display:'inline-block'},
            typeName: 'SelectCommon',
            validations: ['required'],
        }
    ],
    sx: {
        mt: 2,
        mb: 2,
    },
}

export { sampleJsonForm }
