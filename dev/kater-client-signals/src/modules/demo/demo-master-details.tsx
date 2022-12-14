import { useAppGraphql, appGraphqlStrings, Box, Button, SqlObject, showSuccessMessage } from '../../common/misc/redirect'
import { ReactForm } from '../../react-form/react-form'
import { DemoReactForm } from './demo-react-form'
import { sampleJsonForm } from './sample-json-form'
function DemoMasterDetails() {
    const { mutateGraphql } = useAppGraphql()
    return (<Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', columnGap: '1rem' }}>
            <Button variant='contained' onClick={handleButtonMasterEntry}>Master entry</Button>
            <Button variant='contained' onClick={handleButtonMasterDetailsEntry}>Master details entry</Button>
            <Button variant='contained' onClick={handleButtonMasterDetailDetailsEntry}>Master details details entry</Button>
            <Button variant='contained' onClick={handleButtonOneMasterMultipleDetailsEntry}>one master multiple details entry</Button>
            <Button variant='contained' onClick={handleButtonOneMasterMultipleDetailsDetailsEntry}>one master multiple details details entry</Button>            
        </Box>
        <DemoReactForm />
    </Box>)
    function handleButtonMasterEntry() {
        const sqlObject: SqlObject = {
            tableName: 'Master1',
            xData: {
                'master1Col': 'master col 1'
            }
        }
        processSubmit(sqlObject)
    }

    function handleButtonMasterDetailsEntry() {
        const sqlObject: SqlObject = {
            tableName: 'Master1',
            xData: {
                'master1Col': 'master col data 1',
                xDetails: [{
                    tableName: 'Details1',
                    fkeyName: 'master1Id',
                    xData: {
                        'details1Col': 'details1 col data 1'
                    }
                }]
            }
        }
        processSubmit(sqlObject)
    }

    function handleButtonMasterDetailDetailsEntry() {
        const sqlObject: SqlObject = {
            tableName: 'Master1',
            xData: {
                'master1Col': 'master col data 1',
                xDetails: [{
                    tableName: 'Details1',
                    fkeyName: 'master1Id',
                    xData: {
                        'details1Col': 'details1 col data 1',
                        xDetails: [{
                            tableName: 'Details11',
                            fkeyName: 'details1Id',
                            xData: {
                                details11Col: 'details11 col data 1'
                            }
                        }]
                    }
                }]
            }
        }
        processSubmit(sqlObject)
    }

    function handleButtonOneMasterMultipleDetailsEntry() {
        const sqlObject: SqlObject = {
            tableName: 'Master1',
            xData: {
                'master1Col': 'master col data 1',
                xDetails: [{
                    tableName: 'Details1',
                    fkeyName: 'master1Id',
                    xData: {
                        'details1Col': 'details1 col data 1',
                    }
                },
                {
                    tableName: 'Details2',
                    fkeyName: 'master1Id',
                    xData: {
                        'details2Col': 'details2 col data 1',
                    }
                }
                ]
            }
        }
        processSubmit(sqlObject)
    }

    function handleButtonOneMasterMultipleDetailsDetailsEntry() {
        const sqlObject: SqlObject = {
            tableName: 'Master1',
            xData: {
                'master1Col': 'master col data 1',
                xDetails: [{
                    tableName: 'Details1',
                    fkeyName: 'master1Id',
                    xData: {
                        'details1Col': 'details1 col data 1',
                        xDetails: [{
                            tableName: 'Details11',
                            fkeyName: 'details1Id',
                            xData: {
                                details11Col: 'details11 col data 1'
                            }
                        }]
                    }
                },
                {
                    tableName: 'Details2',
                    fkeyName: 'master1Id',
                    xData: {
                        'details2Col': 'details2 col data 1',
                        xDetails: [{
                            tableName: 'Details22',
                            fkeyName: 'details2Id',
                            xData: {
                                details22Col: 'details22 col data 1'
                            }
                        }]
                    }
                }
                ]
            }
        }
        processSubmit(sqlObject)
    }

    async function processSubmit(sqlObject: SqlObject) {
        try {
            const q = appGraphqlStrings.genericUpdate(sqlObject)
            const ret = await mutateGraphql(q)
            showSuccessMessage()
            console.log(ret)
        } catch (e: any) {
            console.log(e)
        }
    }
}
export { DemoMasterDetails }