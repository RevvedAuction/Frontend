import Validations from './Validations.js';

export default class AccountValidations {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    checkValidations() {
    let errors = {};

    // Email validation
    if (!Validations.checkEmail(this.email)) {
        errors.email = 'Invalid email';
    }

    // Password validation
    if (!Validations.minLength(this.password, 8)) {
        errors.password = 'Password should be minimum of 8 characters';
    }

    return errors;
}

    static getErrorMessageFromCode(errorCode) {
        switch (errorCode) {
            case 'EMAIL_EXISTS':
                return 'Email already exists. Please Login';
            case 'EMAIL_NOT_FOUND':
                return 'Email Not Found. Please Create Account';
            case 'INVALID_PASSWORD':
                return 'Invalid Password. Try Again';
            case 'INVALID_LOGIN_CREDENTIALS':
                return 'Email or Password is incorrect or account does not exist';
            default:
                return 'Unexpected Error Has Occurred. Please Try Again';
        }
}

}