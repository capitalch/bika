import {
    _,
    Box,
    DeleteForeverIcon,
    EditIcon,
    GridCellParams,
    GridToolbarContainer,
    IconButton,
    PrintIcon,
    Typography,
    SyncSharpIcon,
    SxProps,
    useTheme,
    GridToolbarColumnsButton,
    Checkbox,
    TextField,
    SearchIcon,
    CloseIcon,
    If,
    Then,
    GridToolbarFilterButton,
    GridToolbarExport,
    useGlobalMediaQuery,
    AddCircleIcon,
    useConfirm,
    messages,
    appGraphqlStrings,
    getPayloadFromGraphqlObject,
    useHookstate,
    appHookState,
    useAppGraphql,
    useEffect,
    useRef,
    // useState,
    filterOn,
    debounceFilterOn,
    ibukiMessages,
    debounceEmit,
} from '../../../misc/redirect'

function XXGridToolbar({ xxGridOptions, fetchData, requestSearch, fetchData1 }: any) {
    const theme = useTheme()

    const { isMediumSizeUp, isLargeSizeUp, isSmallAndMediumSizeUp } =
        useGlobalMediaQuery()
    return (
        <GridToolbarContainer className="custom-toolbar">
            <Box className="sub-title">
                <Typography variant="subtitle2">
                    {xxGridOptions.subTitle}
                </Typography>
            </Box>

            <Box className="main-container">
                <If condition={isSmallAndMediumSizeUp}>
                    <Then>
                        <Typography className="toolbar-title">
                            {xxGridOptions.title}
                        </Typography>
                    </Then>
                </If>

                <Box className="toolbar-left-items">
                    <If condition={isMediumSizeUp}>
                        <Then>
                            <Box component="span" sx={{ ml: theme.spacing(1) }}>
                                <If
                                    condition={
                                        xxGridOptions.isToolbarColumnsButton
                                    }>
                                    <Then>
                                        <GridToolbarColumnsButton color="primary" />
                                    </Then>
                                </If>
                                <If
                                    condition={
                                        xxGridOptions.isToolbarFilterButton
                                    }>
                                    <Then>
                                        <GridToolbarFilterButton color="primary" />
                                    </Then>
                                </If>
                                <If
                                    condition={
                                        xxGridOptions.isToolbarExportButton
                                    }>
                                    <Then>
                                        <GridToolbarExport color="primary" />
                                    </Then>
                                </If>
                            </Box>
                        </Then>
                    </If>
                    <If condition={xxGridOptions.toShowViewLimit}>
                        <Then>
                            <Box
                                component="span"
                                sx={{ ml: theme.spacing(1) }}
                                className="view-limit">
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{
                                        mr: theme.spacing(0.5),
                                    }}>
                                    View
                                </Typography>
                                <select
                                    value={
                                        xxGridOptions.xxGridState.rowsViewLimit
                                            ? xxGridOptions.xxGridState.rowsViewLimit.get()
                                            : '0'
                                    }
                                    style={{
                                        width: '4rem',
                                    }}
                                    onChange={(e: any) => {
                                        xxGridOptions.xxGridState.rowsViewLimit.set(
                                            e.target.value
                                        )
                                        xxGridOptions.fetchData
                                            ? xxGridOptions.fetchData()
                                            : fetchData()
                                    }}>
                                    <option value={'100'}>100</option>

                                    <option value={'1000'}>1000</option>

                                    <option value={'0'}>All</option>
                                </select>
                            </Box>
                        </Then>
                    </If>
                    <IconButton
                        size="medium"
                        color="primary"
                        onClick={
                            xxGridOptions.fetchData
                                ? xxGridOptions.fetchData
                                : fetchData
                        }>
                        <SyncSharpIcon></SyncSharpIcon>
                    </IconButton>
                </Box>
                <Box component="span" className="toolbar-right-items">
                    {/* Search box */}
                    <If condition={isLargeSizeUp}>
                        <Then>
                            <TextField
                                sx={{ mt: theme.spacing(1) }}
                                // inputRef={meta.current.searchTextRef}
                                variant="standard"
                                autoComplete="off"
                                // autoFocus={!meta.current.isFirstTime}
                                value={xxGridOptions.xxGridState.searchString.get()}
                                // onChange={props.onChange}
                                onChange={(e: any) => {
                                    xxGridOptions.xxGridState.searchString.set(
                                        e.target.value
                                    )
                                    debounceEmit(ibukiMessages.xxGridSearchDebounce, '')
                                }}
                                placeholder="Search…"
                                InputProps={{
                                    startAdornment: (
                                        <>
                                            <Checkbox
                                                // checked={pre.isSearchTextOr}
                                                // onClick={
                                                //     handleOnClickSearchCheckbox
                                                // }
                                                size="small"
                                            />
                                            <SearchIcon fontSize="small" />
                                        </>
                                    ),
                                    endAdornment: (
                                        <IconButton
                                            title="Clear"
                                            aria-label="Clear"
                                            size="small"
                                            style={{
                                                visibility:
                                                    xxGridOptions.xxGridState.searchString.get()
                                                        ? 'visible'
                                                        : 'hidden',
                                            }}
                                            onClick={() =>
                                                xxGridOptions.xxGridState.searchString.set(
                                                    ''
                                                )
                                            }>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Then>
                    </If>
                    <If condition={!!xxGridOptions.addMethod}>
                        <Then>
                            {/* Add Button */}   
                            <IconButton
                                color="primary"
                                size="medium"
                                onClick={
                                    // xxGridOptions.addMethod
                                    () => {
                                        xxGridOptions.xxGridState.searchString.set(
                                            'b'
                                        )
                                        fetchData1()
                                    }
                                }>
                                <AddCircleIcon
                                    sx={{
                                        fontSize: theme.spacing(6),
                                        ml: theme.spacing(2),
                                        mr: theme.spacing(1),
                                    }}></AddCircleIcon>
                            </IconButton>
                        </Then>
                    </If>
                </Box>
            </Box>
        </GridToolbarContainer>
    )
}
export {XXGridToolbar}