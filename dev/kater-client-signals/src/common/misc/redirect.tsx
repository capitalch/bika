import { usingIbuki } from './ibuki'
import { AppMaterialDialog } from '../components/app-material-dialog'
import MuiAppBar from '@mui/material/AppBar'
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import messages from './messages.json'
import ibukiMessages from './ibuki-messages.json'
import urlJoin from 'url-join'
export { styled } from '@mui/material/styles'
export { useConfirm } from 'material-ui-confirm'
export { produce } from 'immer'
export { deepSignal, useDeepSignal } from '@deepsignal/react'
export {
    AddCircle as AddCircleIcon,
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon,
    Business as BusinessIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Clear as ClearIcon,
    CloseSharp as CloseIcon,
    DeleteForever as DeleteForeverIcon,
    Edit as EditIcon,
    Home as HomeIcon,
    Logout as LogoutIcon,
    Mail as MailIcon,
    Menu as MenuIcon,
    MiscellaneousServices as MiscellaneousServicesIcon,
    MoveToInbox as InboxIcon,
    Person as PersonIcon,
    PersonOutline as PersonOutlineIcon,
    Password as PasswordIcon,
    Print as PrintIcon,
    Report as ReportIcon,
    Search as SearchIcon,
    Settings as SettingsIcon,
    SettingsApplications as SettingsApplicationsIcon,
    SyncSharp as SyncSharpIcon,
    Summarize as SummarizeIcon,
    ViewList as ViewListIcon,
} from '@mui/icons-material'
export {
    Alert,
    Backdrop,
    Box,
    Button,
    Checkbox,
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
    FormControlLabel,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Snackbar,
    type SxProps,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'

export {
    DataGridPro,
    type GridCellParams,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridFooterContainer,
    useGridApiRef,
} from '@mui/x-data-grid-pro'
export {
    _,
    AppMaterialDialog,
    axios,
    ibukiMessages,
    messages,
    moment,
    MuiAppBar,
    urlJoin,
}
export { TabContext, TabList, TabPanel } from '@mui/lab'
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
export { If, Then, Else, Switch } from 'react-if'
// export { useHookstate } from '@hookstate/core'
export { useAppGraphql } from '../../graphql/app-graphql-hook'
export { appGraphqlStrings } from '../../graphql/app-graphql-strings'
export { gql } from '@apollo/client'

export {
    changeState,
    closeDialog,
    cryptoEncrypt,
    getPayloadFromGraphqlObject,
    getRowsWithSwappedId,
    loadComponent,
    showDialog,
    showErrorMessage,
    showSuccessMessage,
} from './global-utils'
export { globalStore } from '../../stores/global-store'
// export { proxy, useSnapshot } from 'valtio'
export {
    type ErrorMessage,
    type MaterialDialog,
    type SqlObject,
} from './interfaces'
