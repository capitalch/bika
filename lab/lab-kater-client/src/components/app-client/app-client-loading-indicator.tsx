import React from 'react'
import { appMainHookState, } from '../../hook-state/app-hookstate'
import { Backdrop, CircularProgress, useHookstate } from '../../misc/redirect'

function AppClientLoadingIndicator() {
    const appMainGlobalState = useHookstate(appMainHookState)
    return (
        <Backdrop sx={{ zIndex: 9999 }} open={appMainGlobalState.isLoading.get()}>
            <CircularProgress />
        </Backdrop>
    )
}
export { AppClientLoadingIndicator }