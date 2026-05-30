export default class Padlock {
    constructor(password) {
        this.locked = true;
        this.password = password;
    }

    setPassword(newPassword) {
        this.password = newPassword;
    }

    getPassword() {
        return this.password;
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