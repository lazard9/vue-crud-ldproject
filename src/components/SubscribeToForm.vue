<script setup>
import { ref } from 'vue';

const email = ref('');
const status = ref(null); // 'success', 'error', 'loading'

/**
 * Handles the form submission for subscribing to the newsletter.
 * If the email is invalid, it sets the status to 'error'.
 * If the email is valid, it sets the status to 'loading', and
 * simulates sending the email (in a real app, this would be an API call)
 * and sets the status to 'success' on success, or 'error' on failure.
 */
const handleSubmit = async () => {
    if (!email.value.includes('@')) {
        status.value = 'error';
        return;
    }

    status.value = 'loading';

    // Simulates sending (e.g. a real API call goes here later)
    // try {
    //     const response = await fetch('/api/subscribe', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ email: email.value })
    //     });

    //     if (!response.ok) {
    //         throw new Error('Failed to subscribe');
    //     }

    //     status.value = 'success';
    //     email.value = '';
    // } catch (e) {
    //     console.error(e);
    //     status.value = 'error';
    // }

    setTimeout(() => {
        status.value = 'success';
        email.value = '';
    }, 1200);
};
</script>

<template>
    <section class="bg-[var(--color-background-mute)] py-16 px-4">
        <form id="subscription" @submit.prevent="handleSubmit"
            class="space-y-4 max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow">
            <h2 class="text-xl font-semibold text-neutral-800 dark:text-white">Stay up to date</h2>

            <input v-model="email" type="email" placeholder="Enter your email"
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-neutral-800"
                required />

            <button type="submit"
                class="w-full bg-[#19b2e4] hover:bg-[#1cc6fd] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                :disabled="status === 'loading'">
                <span v-if="status !== 'loading'">Subscribe</span>
                <span v-else>Sending...</span>
            </button>

            <p v-if="status === 'success'" class="text-green-600 dark:text-green-400">You're subscribed!</p>
            <p v-if="status === 'error'" class="text-red-600 dark:text-red-400">Please enter a valid email.</p>
        </form>
    </section>
</template>
