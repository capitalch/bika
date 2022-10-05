import { Typography } from '@mui/material'
import _ from 'lodash'
import { Else, If, Then } from 'react-if'
import { errorMessages } from '../error-messages'

function ItemErrors({ errors }: { errors: string[] }) {
    return (
        <span>{getErrorLineItems()}</span>
        // <If
        //     condition={
        //         (!_.isEmpty) && (Array.isArray(errors)) && (errors.length > 0)
        //     }>
        //     <Then>
        //         <ul>{getErrorLineItems()}</ul>
        //     </Then>
        // </If>
    )
    function getErrorLineItems() {
        const lineItems = errors.map((item: string, index: number) => (
            <li key={index}>
                <Typography component="span" variant="caption">
                    {errorMessages[item]}
                </Typography>{' '}
            </li>
        ))
        return lineItems
    }
}
export { ItemErrors }
