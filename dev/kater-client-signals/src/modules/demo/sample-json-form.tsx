import { JsonFormType } from '../../react-form/interfaces'

const sampleJsonForm: JsonFormType = {
    items: [
        {
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
        },
    ],
    sx: {
        mt: 2,
        mb: 2,
    },
    submit: {
        isFullWidthSubmitButton: false,
        onSubmit: (store: any) => {},
    },
}

export { sampleJsonForm }
