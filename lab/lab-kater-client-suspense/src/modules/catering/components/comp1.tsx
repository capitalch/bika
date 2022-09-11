import { Box, gql, Typography, useAppGraphql, useState } from '../../../misc/redirect'
function Comp1() {
    const { queryGraphql } = useAppGraphql()
    const [name, setName] = useState('')
    fetchData()

    return (<Box>
        <Typography>Comp1</Typography>
        <Typography>{name}</Typography>
    </Box>)

    async function fetchData(): Promise<any> {
        try {
            const query = gql`
        query {
            appServer {
                genericView
            }
        }
    `
            const ret = await queryGraphql(query)
            const nm = ret.data.appServer.genericView[0].firstName
            setName(nm)
            console.log(ret.data.appServer.genericView[0].firstName)
        } catch (err: any) {
            console.log(err.message)
        }
    }
}
export { Comp1 }