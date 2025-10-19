export default class Validations {

    static isValidUsername(username) {
        return /^[a-zA-Z0-9_]{3,20}$/.test(username);
    }

    static checkEmail(email) {
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                email,
            )
        ) {
            return true;
        }
        return false;
    }

    static minLength(value, minLength) {
        if (!value || value.length < minLength) {
            return false;
        }
        return true;
    }
}