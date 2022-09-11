import { appHookState, Box, Button, getPayloadFromGraphqlObject, Typography, useAppGraphql, useEffect, useHookstate } from '../../../misc/redirect'
import { useQuery, gql } from '@apollo/client'

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
{
    /* <PDFViewer>
<PdfComp />
</PDFViewer> */
}
// function PdfComp() {
//     const comp = (
//         <Document>
//             <Page size="A4">
//                 <View>
//                     <Text>ABCD</Text>
//                 </View>
//             </Page>
//         </Document>
//     )
//     return comp
// }

// import {
//     Document,
//     Page,
//     PDFViewer,
//     StyleSheet,
//     Text,
//     View,
// } from '@react-pdf/renderer'
