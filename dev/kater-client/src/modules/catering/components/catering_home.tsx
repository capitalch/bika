import { Box, Typography, useEffect } from '../../../misc/redirect'
import { useQuery, gql } from '@apollo/client'
import { graphqlService } from '../../../misc/graphql-service'

function CateringHome() {
    const query = gql`
        query {
            kater {
                genericView
            }
        }
    `
    // const { loading, error, data } = useQuery(query)
    // console.log(data)
    // console.log(process.env.NODE_ENV)
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const { queryGraphql } = graphqlService()
        const ret = await queryGraphql(query)
        console.log(ret)
    }
    return (
        <Box>
            <Typography component="div">Catering home</Typography>
        </Box>
    )
}
export { CateringHome }
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
