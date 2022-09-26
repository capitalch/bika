import { useAppGraphql, appGraphqlStrings, Box, Button, SqlObject, showSuccessMessage } from '../../../common/misc/redirect'
function DemoMasterDetails() {
    const { mutateGraphql } = useAppGraphql()
    return (<Box sx={{ display: 'flex', columnGap: '1rem' }}>
        <Button variant='contained' onClick={handleButtonMasterEntry}>Master entry</Button>
        <Button variant='contained' onClick={handleButtonMasterDetailsEntry}>Master details entry</Button>
        <Button variant='contained' onClick={handleButtonMasterDetailDetailsEntry}>Master details details entry</Button>
        <Button variant='contained' onClick={handleButtonOneMasterMultipleDetailsEntry}>one master multiple details entry</Button>
        <Button variant='contained' onClick={handleButtonOneMasterMultipleDetailsDetailsEntry}>one master multiple details details entry</Button>
    </Box>)
    function handleButtonMasterEntry() {
        const sqlObject: SqlObject = {
            tableName: 'Master1',
            data: {
                'master1Col': 'master col 1'
            }
        }
        processSubmit(sqlObject)
    }

    function handleButtonMasterDetailsEntry() {
        const sqlObject: SqlObject = {
            tableName: 'Master1',
            data: {
                'master1Col': 'master col data 1',
                details:[{
                    tableName:'Details1',
                    fkeyName: 'master1Id',
                    data: {
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
            data: {
                'master1Col': 'master col data 1',
                details:[{
                    tableName:'Details1',
                    fkeyName: 'master1Id',
                    data: {
                        'details1Col': 'details1 col data 1',
                        details:[{
                            tableName:'Details11',
                            fkeyName:'details1Id',
                            data:{
                                details11Col:'details11 col data 1'
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
            data: {
                'master1Col': 'master col data 1',
                details:[{
                    tableName:'Details1',
                    fkeyName: 'master1Id',
                    data: {
                        'details1Col': 'details1 col data 1',
                    }
                },
                {
                    tableName:'Details2',
                    fkeyName: 'master1Id',
                    data: {
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
            data: {
                'master1Col': 'master col data 1',
                details:[{
                    tableName:'Details1',
                    fkeyName: 'master1Id',
                    data: {
                        'details1Col': 'details1 col data 1',
                        details:[{
                            tableName:'Details11',
                            fkeyName:'details1Id',
                            data:{
                                details11Col:'details11 col data 1'
                            }
                        }]
                    }
                },
                {
                    tableName:'Details2',
                    fkeyName: 'master1Id',
                    data: {
                        'details2Col': 'details2 col data 1',
                        details:[{
                            tableName:'Details22',
                            fkeyName:'details2Id',
                            data:{
                                details22Col:'details22 col data 1'
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