import { JsonFormItemType } from "../../react-form/interfaces"

const sampleJsonForm = {
    items: [
        {
            label: 'Name',
            name: 'personName',
            sx: {
                mt: 2
            },
            type: 'TextMaterial',
            validations:['required']
        },
        {
            label: 'Address1',
            name: 'address1',
            sx: {
                mt: 2,
                ml: 1
            },
            type: 'TextMaterial',
            validations:['required']
        },
        {
            label: 'Address2',
            name: 'address2',
            sx: {
                mt: 2,
                ml: 1
            },
            type: 'TextMaterial',
        },
    ],
    sx: {
        mt: 2, mb: 2
    }
}

export { sampleJsonForm }
