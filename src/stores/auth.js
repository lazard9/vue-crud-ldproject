import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    /**
     * The state of the authentication store.
     *
     * @property {boolean} loggedIn - Whether the user is logged in.
     * @property {boolean} showLogin - Whether the login modal is currently shown.
     */
    state: () => ({
        loggedIn: document.cookie.includes('session=1'),
        showLogin: false,
    }),
    actions: {
        /**
         * Logs in the user with the given username and password.
         * @async
         * @function
         * @param {string} username - Username to log in with.
         * @param {string} password - Password to log in with.
         * @returns {Promise<{ success: boolean, message?: string }>} - Whether the login was successful. If not, an optional message is provided.
         */
        login(username, password) {
            if (username === 'admin' && password === 'password') {
                document.cookie = "session=1; max-age=3600; path=/"
                this.loggedIn = true
                this.showLogin = false
                return { success: true }
            }
            return { success: false, message: 'Invalid username or password.' }
        },
        /**
         * Logs out the user.
         * @function
         */
        logout() {
            document.cookie = "session=; max-age=0; path=/"
            this.loggedIn = false
        },
        /**
         * Opens the login modal.
         * @function
         */
        openLoginModal() {
            this.showLogin = true
        },
        /**
         * Closes the login modal.
         * @function
         */
        closeLoginModal() {
            this.showLogin = false
        }
    }
})
