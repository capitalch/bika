import { immer, SxProps, useTheme } from '../../misc/redirect'
function useAppXXGrid() {
    const theme = useTheme()

    function getStyledColumns(columns: any[]) {
        const ret:any[] = columns.map((item: any) => {
            item.headerClassName = 'header-style'

            return item
        })
        // ret.push({
        //     headerName:'#',
        //     width: 60,
        //     field:'id',
        //     headerClassName: 'header-style'
        // })
        return ret
    }

    const sxStyles: SxProps = {
        '& .header-style': {
            color: theme.palette.secondary.main,
            fontWeight: 'bolder',
        },
    }

    

    return {getStyledColumns, sxStyles }
}
export { useAppXXGrid }
