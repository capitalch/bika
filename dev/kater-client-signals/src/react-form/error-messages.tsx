const errorMessages: { [key: string]: string } = {
    alphabetsOnly: 'Only alphabets are allowed',
    alphanumericAndSpace: 'Only alphanumeric and space allowed',
    alphanumericOnly: 'Only alphanumeric chars allowed',
    atLeast8Chars: 'At least 8 chars required',
    email: 'Invalid mail',
    formError:'This form has errors',
    numbersOnly: 'Only numbers allowed',
    oneNumeric: 'One numeric char required',
    oneSpecialChar: 'One special char required',
    oneUpperCase: 'One upper case char required',
    required: 'Required field',
    serverError: 'Error saving data at server',
    validPassword: 'Minimum 8 chars, 1 special char and 1 numeric required',
}

export { errorMessages }
