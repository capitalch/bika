import { createTheme, ThemeProvider } from '@mui/material'
import { LicenseInfo } from '@mui/x-data-grid-pro'
import { ConfirmProvider } from 'material-ui-confirm'
import './App.scss'
import { AppMain } from './components/app-main'
import { emit, filterOn } from './misc/redirect'

function App() {
    LicenseInfo.setLicenseKey(
        '094c13fcff99f49fe015161354d1d052T1JERVI6MjkzMjgsRVhQSVJZPTE2NjMxMjQ0NjcwMDAsS0VZVkVSU0lPTj0x'
    )

    // To disable mobile browser back
    window.history.pushState(null, 'null', window.location.href)
    window.onpopstate = function () {
        window.history.go(1)
    }
    const theme = createTheme()

    return (
        <ThemeProvider theme={theme}>
            <ConfirmProvider>
                <AppMain />
            </ConfirmProvider>
        </ThemeProvider>
    )
}

export default App
