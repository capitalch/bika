import { usingIbuki } from './ibuki'
import MuiAppBar from '@mui/material/AppBar'
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import immer from 'immer'
// import { Immer } from 'immer'

export { styled } from '@mui/material/styles'
export {
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon,
    Business as BusinessIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    CloseSharp as CloseIcon,
    Home as HomeIcon,
    Mail as MailIcon,
    Menu as MenuIcon,
    MiscellaneousServices as MiscellaneousServicesIcon,
    MoveToInbox as InboxIcon,
    Report as ReportIcon,
    Settings as SettingsIcon,
    SettingsApplications as SettingsApplicationsIcon,
    Summarize as SummarizeIcon,
    ViewList as ViewListIcon,
} from '@mui/icons-material'
export {
    Box,
    Button,
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
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
export { _, axios, immer, moment, MuiAppBar }
export { useEffect, useLayoutEffect,useRef, useState } from 'react'
export const {
    debounceEmit,
    debounceFilterOn,
    emit,
    filterOn,
    hotEmit,
    hotFilterOn,
} = usingIbuki()

export { useGlobalMediaQuery } from './global-media-query-hook'

export { hookstate, useHookstate } from '@hookstate/core'
