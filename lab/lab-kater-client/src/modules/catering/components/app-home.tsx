import { appHookState, AppMaterialDialog, Box, Button, getPayloadFromGraphqlObject, TextField, Typography, useAppGraphql, useEffect, useHookstate, useTheme } from '../../../misc/redirect'
import { useQuery, gql } from '@apollo/client'

function AppHome() {
    const appGlobalState = useHookstate(appHookState)
    const theme = useTheme()
    const logicMap:any = {
        1: <Box1 />,
        2: <Box2 />,
        3: <Box3 />,
        4: <Box4 />
    }
    useEffect(() => {

    }, [])
    appGlobalState.dialog.merge({ showDialog: true, title: 'Wizard' })

    function WizardContent() {
        const currPage = appGlobalState.wizard1.currentPage.get()
        // const Content:any = logicMap[currPage]
        return (<>{logicMap[currPage]}</>)
    }
    return (
        <AppMaterialDialog isClosable={true} Content={WizardContent} />
    )
}
export { AppHome }

function Box1() {
    const theme = useTheme()
    const appGlobalState = useHookstate(appHookState)
    return (<Box sx={{ width: theme.spacing(60), height: theme.spacing(40), display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h5'>Box1</Typography>
        <Box>
            <TextField size='small' variant='outlined'></TextField>
            <TextField size='small' variant='outlined'></TextField>
        </Box>
        <Box>
            <TextField size='small' variant='outlined'></TextField>
            <TextField size='small' variant='outlined'></TextField>
        </Box>
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled={true} onClick={handlePrev} variant='contained'>Prev</Button>
            <Button variant='contained' onClick={handleNext}>Next</Button>
        </Box>
    </Box>)
    function handlePrev() {
        const currPage = appGlobalState.wizard1.currentPage.get()
        appGlobalState.wizard1.currentPage.set(currPage - 1)
    }
    function handleNext() {
        const currPage = appGlobalState.wizard1.currentPage.get()
        if (currPage < 4) {
            appGlobalState.wizard1.currentPage.set(currPage + 1)
        }
    }
}

function Box2() {
    const theme = useTheme()
    const appGlobalState = useHookstate(appHookState)
    return (<Box sx={{ width: theme.spacing(60), height: theme.spacing(40), display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h5'>Box2</Typography>
        <Box>
            <TextField size='small' variant='outlined'></TextField>
            <TextField size='small' variant='outlined'></TextField>
        </Box>
        <Box>
            <TextField size='small' variant='outlined'></TextField>
            <TextField size='small' variant='outlined'></TextField>
        </Box>
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={handlePrev}>Prev</Button>
            <Button variant='contained' onClick={handleNext}>Next</Button>
        </Box>
    </Box>)
    function handlePrev() {
        const currPage = appGlobalState.wizard1.currentPage.get()
        appGlobalState.wizard1.currentPage.set(currPage - 1)
    }
    function handleNext() {
        const currPage = appGlobalState.wizard1.currentPage.get()
        if (currPage < 4) {
            appGlobalState.wizard1.currentPage.set(currPage + 1)
        }
    }
}

function Box3() {
    const theme = useTheme()
    const appGlobalState = useHookstate(appHookState)
    return (<Box sx={{ width: theme.spacing(60), height: theme.spacing(40), display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h5'>Box3</Typography>
        <Box>
            <TextField size='small' variant='outlined'></TextField>
            <TextField size='small' variant='outlined'></TextField>
        </Box>
        <Box>
            <TextField size='small' variant='outlined'></TextField>
            <TextField size='small' variant='outlined'></TextField>
        </Box>
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={handlePrev}>Prev</Button>
            <Button variant='contained' onClick={handleNext}>Next</Button>
        </Box>
    </Box>)
    function handlePrev() {
        const currPage = appGlobalState.wizard1.currentPage.get()
        appGlobalState.wizard1.currentPage.set(currPage - 1)
    }
    function handleNext() {
        const currPage = appGlobalState.wizard1.currentPage.get()
        if (currPage < 4) {
            appGlobalState.wizard1.currentPage.set(currPage + 1)
        }
    }
}

function Box4() {
    const theme = useTheme()
    const appGlobalState = useHookstate(appHookState)
    return (<Box sx={{ width: theme.spacing(60), height: theme.spacing(40), display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h5'>Box4</Typography>
        <Box>
            <TextField size='small' variant='outlined'></TextField>
            <TextField size='small' variant='outlined'></TextField>
        </Box>
        <Box>
            <TextField size='small' variant='outlined'></TextField>
            <TextField size='small' variant='outlined'></TextField>
        </Box>
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={handlePrev}>Prev</Button>
            <Button variant='contained' onClick={handleNext}>Next</Button>
        </Box>
    </Box>)
    function handlePrev() {
        const currPage = appGlobalState.wizard1.currentPage.get()
        appGlobalState.wizard1.currentPage.set(currPage - 1)
    }
    function handleNext() {
        const currPage = appGlobalState.wizard1.currentPage.get()
        if (currPage < 4) {
            appGlobalState.wizard1.currentPage.set(currPage + 1)
        }
    }
}