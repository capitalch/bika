import { Typography } from '@mui/material'
import { errorMessages } from '../error-messages'

function ItemErrors({ errors }: { errors: string[] }) {
    return (
        <Typography component='span'>{getErrorLineItems()}</Typography>
    )
    function getErrorLineItems() {
        const lineItems = errors.map((item: string, index: number) => (
            <Typography component='li' key={index} variant="caption">
                    {errorMessages[item]}
            </Typography>
        ))
        return lineItems
    }
}
export { ItemErrors }
