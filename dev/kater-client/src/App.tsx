import { createTheme, Theme, ThemeProvider } from '@mui/material'
import { brown, red } from '@mui/material/colors'
import { LicenseInfo } from '@mui/x-data-grid-pro'
import { ConfirmProvider } from 'material-ui-confirm'
import './App.scss'
import { AppMain } from './components/app-main/app-main'
// import { emit, filterOn } from './misc/redirect'

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        menuButton: true
    }
}

function App() {
    LicenseInfo.setLicenseKey(
        '094c13fcff99f49fe015161354d1d052T1JERVI6MjkzMjgsRVhQSVJZPTE2NjMxMjQ0NjcwMDAsS0VZVkVSU0lPTj0x'
    )

    // To disable mobile browser back
    window.history.pushState(null, 'null', window.location.href)
    window.onpopstate = function () {
        window.history.go(1)
    }

    const globalTheme = createTheme({
        palette: {
            //   primary: {
            //     main: 'rgba(217,255,102,1)'
            //   }
        },
    })

    const theme: any = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform:'none',                        
                    },
                },
                variants: [
                    {
                        props: { variant: 'menuButton' },
                        style: {
                            border: '2px solid transparent',
                            fontSize:'1.2rem',
                            
                            '&&:hover': {
                                border: `2px solid ${globalTheme.palette.background.default}`,
                            },
                        },
                    },
                ],
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <ConfirmProvider>
                <AppMain />
            </ConfirmProvider>
        </ThemeProvider>
    )
}

export default App
