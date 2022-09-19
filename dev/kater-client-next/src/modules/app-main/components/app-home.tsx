import { Box, Button, Typography, useAppGraphql, useEffect, } from '../../../misc/redirect'
import { gql } from '@apollo/client'

function AppHome() {
    const { queryGraphql } = useAppGraphql()
    const query = gql`
        query getData {
            appServer {
                genericView
            }
        }
    `
    // const { loading, error, data } = useQuery(query)
    // console.log(data)
    // console.log(process.env.NODE_ENV)
    useEffect(() => {
        // fetchData()
    }, [])

    async function fetchData() {
        const ret = await queryGraphql(query)
        console.log(ret)
    }
    return (
        <Box>
            <Typography component="div">Catering home</Typography>
            <Button variant='contained' onClick={fetchData}>Fetch</Button>
            <Typography component='div'></Typography>
        </Box>
    )
}
export { AppHome }
