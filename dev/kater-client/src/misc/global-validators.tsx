import { messages } from './redirect'
function globalValidators() {

    function checkUidError(input: string) {
        //should be alphanumeric, non empty and no space in between or email
        let error = ''
        if (!isValidEmail(input)) {
            error = checkRequired(input)
                || checkNoSpaceOrSpecialChar(input)
                || ''
        }
        if (error) {
            error = messages.messInvalidInput
        }
        return (error)
    }

    function checkPwdError(input: string) {
        const error = checkRequired(input)
            || checkAtLeast6Chars(input)
            || checkMustHaveOneLetter(input)
            || checkMustHaveOneDigit(input)
            || checkMustHaveOneSpecialChar(input)
            || ''
        return (error)
    }

    function checkAtLeast6Chars(input: string) {
        let error = ''
        if (input.length < 6) {
            error = messages.messAtLease6Chars
        }
        return (error)
    }

    function checkMustHaveOneDigit(input: string) {
        let error = ''
        if (input.search(/[0-9]/) < 0) {
            error = messages.messMustHaveOneDigit
        }
        return (error)
    }

    function checkMustHaveOneLetter(input: string) {
        let error = ''
        if (input.search(/[a-z]/i) < 0) {
            error = messages.messMustHaveOneLetter
        }
        return (error)
    }

    function checkMustHaveOneSpecialChar(input: string) {
        let error = ''
        if (input.search(/[!@#\$%\^&\*_`~]/) < 0) {
            error = messages.messMustHaveOneSpecialChar
        }
        return (error)
    }

    function checkNoSpaceOrSpecialChar(input: string) {
        let error = ''
        // const re = /^[\w-_@.]*$/
        if (input.search(/^[\w-_]*$/) < 0) {
            error = messages.messNoSpaceOrSpecialChar
        }
        return (error)
    }

    function checkRequired(input: string) {
        let error = ''
        if (input.length === 0) {
            error = messages.messRequired
        }
        return (error)
    }

    function isValidEmail(input: string) {
        const ret = input.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        return (ret)
    }


    return ({ checkPwdError, checkUidError })
}
export { globalValidators }