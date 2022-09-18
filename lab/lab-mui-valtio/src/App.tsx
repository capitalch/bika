import { createTheme, ThemeProvider, useTheme } from '@mui/material'
import { LicenseInfo } from '@mui/x-data-grid-pro'
import { AppMain } from './app-main';
import './App.scss';

function App() {
  LicenseInfo.setLicenseKey(
    '094c13fcff99f49fe015161354d1d052T1JERVI6MjkzMjgsRVhQSVJZPTE2NjMxMjQ0NjcwMDAsS0VZVkVSU0lPTj0x'
  )
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <AppMain />
    </ThemeProvider>
  );
}

export default App;
