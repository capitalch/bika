import { useMediaQuery, useTheme } from './redirect'

type breakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
function useGlobalMediaQuery() {
    const theme = useTheme()
    const isEqualsXS = useMediaQuery(theme.breakpoints.only('xs'), {
        noSsr: true,
    })
    const isEqualsSM = useMediaQuery(theme.breakpoints.only('sm'), {
        noSsr: true,
    })
    const isEqualsMD = useMediaQuery(theme.breakpoints.only('md'), {
        noSsr: true,
    })
    const isEqualsLG = useMediaQuery(theme.breakpoints.only('lg'), {
        noSsr: true,
    })
    const isEqualsXL = useMediaQuery(theme.breakpoints.only('xl'), {
        noSsr: true,
    })
    const isSmallAndMediumSizeUp = useMediaQuery(theme.breakpoints.up('sm'), {
        noSsr: true,
    })
    const isSmallAndMediumSizeDown = useMediaQuery(theme.breakpoints.down('sm'), {
        noSsr: true,
    })
    const isMediumSizeUp = useMediaQuery(theme.breakpoints.up('md'), {
        noSsr: true,
    })
    const isMediumSizeDown = useMediaQuery(theme.breakpoints.down('md'), {
        noSsr: true,
    })
    const isLargeSizeUp = useMediaQuery(theme.breakpoints.up('lg'), {
        noSsr: true,
    })
    const isLargeSizeDown = useMediaQuery(theme.breakpoints.down('lg'), {
        noSsr: true,
    })
    const isExtraLargeSizeUp = useMediaQuery(theme.breakpoints.up('xl'), {
        noSsr: true,
    })
    const isExtraLargeSizeDown = useMediaQuery(theme.breakpoints.down('xl'), {
        noSsr: true,
    })

    function getCurrentMediaSize() {
        let ret = 'xs'
        if (isEqualsSM)
            ret = 'sm'
        else if (isEqualsMD)
            ret = 'md'
        else if (isEqualsLG)
            ret = 'lg'
        else if (isEqualsXL)
            ret = 'xl'
        return ret
    }

    return {
        getCurrentMediaSize,
        isEqualsXS,
        isEqualsSM,
        isEqualsMD,
        isEqualsLG,
        isEqualsXL,
        isExtraLargeSizeDown,
        isExtraLargeSizeUp,
        isLargeSizeDown,
        isLargeSizeUp,
        isMediumSizeDown,
        isMediumSizeUp,
        isSmallAndMediumSizeDown,
        isSmallAndMediumSizeUp,
    }
}
export { useGlobalMediaQuery }
