import { createTheme, ThemeProvider } from '@mui/material'
import { LicenseInfo } from '@mui/x-data-grid-pro'
import { ConfirmProvider } from 'material-ui-confirm'
import './App.scss'
import { AppNavigation } from './common/navigation/app-navigation'

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        menuButton: true
    }
}

declare module '@mui/material/Typography'{
    interface TypographyPropsVariantOverrides {
        dialogTitle: true
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
        typography: {
            subtitle1: {
                fontWeight: 'bold',
                fontSize: '16px'
            },
            subtitle2: {
                fontSize: '14px',
            },
            caption: {
                color: globalTheme.palette.error.light
            },
            

        },
        components: {
            MuiTypography:{
                variants: [
                    {
                        props: {variant: 'dialogTitle'},
                        style:{
                            fontSize: '20px',
                            color: globalTheme.palette.primary.main,
                            fontWeight:'bold',
                        }
                    }
                ]
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                    },
                },
                variants: [
                    {
                        props: { variant: 'menuButton' },
                        style: {
                            border: '2px solid transparent',
                            fontSize: '1.2rem',

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
                <AppNavigation />
            </ConfirmProvider>
        </ThemeProvider>
    )
}

export default App
