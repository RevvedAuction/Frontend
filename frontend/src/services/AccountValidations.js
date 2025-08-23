import Validations from './Validations.js';

export default class AccountValidations {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    checkValidations() {
        let errors = [];

        //the email validations
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'invalid email';
        }

        //the password Validations
        if (!Validations.minLength(this.password, 8)) {
            errors['password'] = 'password should be 8 characters';
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
            default:
                return 'Unexpected Error Has Occurred. Please Try Again';
        }
    }
}