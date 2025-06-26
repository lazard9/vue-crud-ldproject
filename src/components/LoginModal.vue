<script setup>
import { ref } from "vue";
const props = defineProps({});

const emit = defineEmits(["close", "login"]);

const copiedField = ref(null)
const username = ref("");
const password = ref("");
const error = ref("");

function handleLogin() {
    if (username.value === "admin" && password.value === "password") {
        document.cookie = "session=1; max-age=3600; path=/";
        emit("login");
    } else {
        error.value = "Invalid username or password.";
    }
}

// function copyToClipboard(text) {
//     navigator.clipboard.writeText(text);
// }

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
        @click.self="$emit('close')">
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
                    <input v-model="username" type="text" autocomplete="username"
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
                        @click="$emit('close')">
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
