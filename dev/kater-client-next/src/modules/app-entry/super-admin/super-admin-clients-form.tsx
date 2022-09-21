import { Box, Checkbox, SxProps, TextField, Typography, useTheme } from '../../../shared-utils/redirect'
function SuperAdminClientForm(){
    const theme = useTheme()
    return(<Box sx={getSxStyles()}>
        <TextField 
            label={<Typography>Client name</Typography>}
            variant='standard'
            size='small'
            color='primary'
            sx={{mt:0, pt:0}}
        />
        <TextField className='input'
            label={<Typography>Short code</Typography>}
            variant='standard'
            size='small'
        />
        <TextField className='input'
            label={<Typography>Remarks</Typography>}
            variant='standard'
            size='small'
        />
        <Checkbox title='Active' />
    </Box>)

    function getSxStyles():SxProps{
        return({
            display:'flex',
            flexDirection: 'column',
            width:theme.spacing(40),
            '& .input':{
                mt:2,
                width:'100%',
                color:theme.palette.primary.main
            }
        })
    }
}
export {SuperAdminClientForm}