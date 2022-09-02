import { Page, View, Document, Text, PDFViewer } from '@react-pdf/renderer'

function PdfComp() {
    return (
        <PDFViewer>
            <Document>
                <Page>
                    <View>
                        <Text>Test</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}
export { PdfComp }
