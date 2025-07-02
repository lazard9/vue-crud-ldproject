import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loggedIn: document.cookie.includes('session=1'),
        showLogin: false,
    }),
    actions: {
        login(username, password) {
            if (username === 'admin' && password === 'password') {
                document.cookie = "session=1; max-age=3600; path=/"
                this.loggedIn = true
                this.showLogin = false
                return { success: true }
            }
            return { success: false, message: 'Invalid username or password.' }
        },
        logout() {
            document.cookie = "session=; max-age=0; path=/"
            this.loggedIn = false
        },
        openLoginModal() {
            this.showLogin = true
        },
        closeLoginModal() {
            this.showLogin = false
        }
    }
})
