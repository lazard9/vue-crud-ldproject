<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const copiedField = ref(null)
const username = ref("");
const password = ref("");
const error = ref("");

const usernameInput = ref(null)
onMounted(() => usernameInput.value?.focus());

/**
 * Handles login form submission.
 * @async
 * @function
 * @param {string} username - Username to log in with.
 * @param {string} password - Password to log in with.
 * @returns {Promise<void>}
 */
async function handleLogin() {
    const result = await auth.login(username.value, password.value);

    if (result.success) {
        username.value = "";
        password.value = "";
        error.value = "";
    } else {
        error.value = result.message;
    }
}

/**
 * Copies the provided field value (either "admin" or "password") to the
 * user's clipboard. If the corresponding input field is empty, the value
 * is also set as the input field value. The function also temporarily
 * displays a "copied" indicator next to the field.
 * @param {string} field - The field to copy ("admin" or "password")
 */
function copyToClipboard(field) {
    const value = field === 'admin' ? 'admin' : 'password'

    navigator.clipboard.writeText(value).then(() => {
        copiedField.value = field

        if (field === 'admin' && !username.value) username.value = value
        if (field === 'password' && !password.value) password.value = value

        setTimeout(() => {
            copiedField.value = null
        }, 1000)
    })
}
</script>

<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="auth.closeLoginModal()">
        <div
            class="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 rounded-lg shadow-lg w-full max-w-md p-6 transition-colors duration-500 mx-4">
            <h2 class="text-2xl font-semibold mb-4 text-zinc-700 dark:text-zinc-200">
                Login
            </h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                This is a mock login. No backend is used. Credentials are stored
                in a session cookie.
            </p>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                Click on the "admin" or "password" text to copy it to your clipboard.
            </p>
            <div class="text-sm text-zinc-600 dark:text-zinc-400 mb-4 space-y-2">
                <div class="flex items-center gap-2">
                    <span class="font-semibold">User:</span>
                    <code
                        class="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded cursor-pointer flex items-center gap-1 select-none"
                        @click="copyToClipboard('admin')" title="Click to copy">
                        admin
                        <span class="opacity-70" v-if="copiedField !== 'admin'">⧉</span>
                        <span v-else class="text-green-500 font-bold">✔</span>
                    </code>
                </div>

                <div class="flex items-center gap-2">
                    <span class="font-semibold">Password:</span>
                    <code
                        class="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded cursor-pointer flex items-center gap-1 select-none"
                        @click="copyToClipboard('password')" title="Click to copy">
                        password
                        <span class="opacity-70" v-if="copiedField !== 'password'">⧉</span>
                        <span v-else class="text-green-500 font-bold">✔</span>
                    </code>
                </div>
            </div>


            <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
                <div>
                    <label class="block text-sm mb-1">Username</label>
                    <input ref="usernameInput" v-model="username" type="text" autocomplete="username"
                        class="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                </div>

                <div>
                    <label class="block text-sm mb-1">Password</label>
                    <input v-model="password" type="password" autocomplete="current-password"
                        class="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                </div>

                <div class="flex justify-between items-center mt-2">
                    <button type="submit"
                        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition">
                        Login
                    </button>
                    <button type="button"
                        class="px-4 py-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-100 rounded transition"
                        @click="auth.closeLoginModal()">
                        Cancel
                    </button>
                </div>

                <p v-if="error" class="text-red-500 text-sm mt-2">
                    {{ error }}
                </p>
            </form>
        </div>
    </div>
</template>
