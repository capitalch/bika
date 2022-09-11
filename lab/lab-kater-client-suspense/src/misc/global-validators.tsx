// import { messages } from './redirect'
function globalValidators() {

    function checkUidError(input: string) {
        //should be alphanumeric, non empty and no space in between
        const errors = []
        const regex = /^[\w-_@.]*$/
        if (input.length === 0) {
            errors.push('Empty value not allowed')
        } else if (!regex.test(input)) {
            errors.push('Blank space or special character not allowed')
        }
        return (errors.join('\n'))
    }

    function checkPwdError(input: string) {
        let error = ''
        if (input.length === 0) {
            error = 'Password cannot be empty'
        } else if (input.length < 6) {
            error = 'Password must be at least 6 characters long'
        } else if (input.search(/[a-z]/i) < 0) {
            error = 'Password must have at least one letter'
        } else if (input.search(/[0-9]/) < 0) {
            error = 'Password must have at least one digit'
        } else if (input.search(/[!@#\$%\^&\*_`~]/) < 0) {
            error = 'Password must have at least one special character'
        }
        return (error)
    }

    return ({ checkPwdError, checkUidError })
}
export { globalValidators }