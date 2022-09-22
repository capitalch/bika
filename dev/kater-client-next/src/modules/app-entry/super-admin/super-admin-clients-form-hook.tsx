import { SxProps, useState, useTheme } from '../../../shared-utils/redirect'
function useSuperAdminClientsForm() {
    const theme = useTheme()
    const [localState, setLocalState] = useState({
        id: undefined,
        clientName: '',
        shortCode: '',
        remarks: '',
        isActive: true,
    })
    function getSxStyles(): SxProps {
        return {
            display: 'flex',
            flexDirection: 'column',
            width: theme.spacing(40),
            '& .input': {
                mt: 2,
                width: '100%',
                color: theme.palette.primary.main,
            },
        }
    }

    return { getSxStyles }
}
export { useSuperAdminClientsForm }
