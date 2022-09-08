import { usingIbuki } from './ibuki'
import MuiAppBar from '@mui/material/AppBar'
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import immer from 'immer'
import messages from './messages.json'
import urlJoin from 'url-join'
export { styled } from '@mui/material/styles'
export {
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon,
    Business as BusinessIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Clear as ClearIcon,
    CloseSharp as CloseIcon,
    Home as HomeIcon,
    Logout as LogoutIcon,
    Mail as MailIcon,
    Menu as MenuIcon,
    MiscellaneousServices as MiscellaneousServicesIcon,
    MoveToInbox as InboxIcon,
    Person as PersonIcon,
    PersonOutline as PersonOutlineIcon,
    Password as PasswordIcon,
    Report as ReportIcon,
    Settings as SettingsIcon,
    SettingsApplications as SettingsApplicationsIcon,
    Summarize as SummarizeIcon,
    ViewList as ViewListIcon,
} from '@mui/icons-material'
export {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    ClickAwayListener,
    Container,
    Collapse,
    CssBaseline,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Drawer,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
export { _, axios, immer, messages, moment, MuiAppBar, urlJoin }
export { useEffect, useLayoutEffect, useRef, useState } from 'react'
export const {
    debounceEmit,
    debounceFilterOn,
    emit,
    filterOn,
    hotEmit,
    hotFilterOn,
} = usingIbuki()
export { globalValidators } from './global-validators'
export { useGlobalMediaQuery } from './global-media-query-hook'

export { hookstate, useHookstate } from '@hookstate/core'
export { appMainHookState } from '../hook-state/app-hookstate'
export { UserLoginWelcome } from '../modules/authentication/user-login-welcome'
export { useAppGraphql } from '../graphql/app-graphql-hook'
export { appGraphqlStrings } from '../graphql/app-graphql-strings'
// export { gql } from '@apollo/client'
// export {} from '../components/app-main'
