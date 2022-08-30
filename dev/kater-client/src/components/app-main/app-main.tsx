import { AppBar, Drawer, Toolbar } from '@mui/material'
import {
    Box,
    Button,
    Container,
    useGlobalMediaQuery,
    useMediaQuery,
    useTheme,
} from '../../misc/redirect'
function AppMain() {
    const theme = useTheme()
    const {
        getCurrentMediaSize,
        isEqualsXS,
        isEqualsSM,
        isEqualsMD,
        isEqualsLG,
        isEqualsXL,
        isMediumSizeUp,
        isLargeSizeUp,
        isExtraLargeSizeUp,
    } = useGlobalMediaQuery()
    console.log(getCurrentMediaSize())

    return (
        <Box>
            <AppBar position="fixed" sx={{ marginRight: '1px', width: `${isExtraLargeSizeUp ? '90%' : '100%'}` }}>
                <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                    <Button size="large" sx={{ color: 'whitesmoke' }}>
                        Catering
                    </Button>
                    <Button size="large" sx={{ color: 'whitesmoke' }}>
                        Catering
                    </Button>
                </Toolbar>
            </AppBar>
            {/* <Drawer  open={true}/> */}
        </Box>
    )
}
export { AppMain }
