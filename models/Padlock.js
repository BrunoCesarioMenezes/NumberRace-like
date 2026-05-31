export default class Padlock {
    constructor(password, numberOfDigits) {
        this.locked = true;
        this.password = password;
        this.numberOfDigits = numberOfDigits;
    }

    setPassword(newPassword) {
        this.password = newPassword;
    }

    getPassword() {
        return this.password;
    }

    getNumberOfDigits() {
        return this.numberOfDigits;
    }

    lock() {
        this.locked = true;
    }

    unlock(inputPassword) {
        if (inputPassword === this.password) {
            this.locked = false;
            return true;
        } else {
            return false;
        }
    }

    isLocked() {
        return this.locked;
    }
}