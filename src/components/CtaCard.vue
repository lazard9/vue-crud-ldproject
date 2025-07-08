<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    title: String,
    description: String,
    buttonText: String,
    buttonColor: {
        type: String,
        default: 'blue',
        validator: (val) => ['blue', 'purple', 'red', 'green', 'orange', 'yellow'].includes(val),
    },
    link: String,           // optional
    action: Function,       // optional: e.g., openLoginModal
});

const colorClasses = {
    blue: 'bg-[#19b2e4] hover:bg-[#1cc6fd]',
    purple: 'bg-[#7d3fe0] hover:bg-[#9354fc]',
    red: 'bg-red-600 hover:bg-red-500',
    green: 'bg-green-600 hover:bg-green-500',
    orange: 'bg-orange-500 hover:bg-orange-400',
    yellow: 'bg-yellow-400 hover:bg-yellow-300',
};
</script>

<template>
    <div class="p-6 rounded-2xl shadow-md bg-[var(--color-background-soft)] flex flex-col items-start gap-4">
        <h3 class="text-2xl font-semibold text-neutral-800 dark:text-white">{{ title }}</h3>
        <p class="text-neutral-600 dark:text-neutral-300">{{ description }}</p>

        <RouterLink v-if="link" :to="link" class="text-white px-5 py-2 rounded-lg transition-colors duration-200"
            :class="colorClasses[buttonColor]">
            {{ buttonText }}
        </RouterLink>

        <button v-else-if="action" @click="action" type="button"
            class="text-white px-5 py-2 rounded-lg transition-colors duration-200" :class="colorClasses[buttonColor]">
            {{ buttonText }}
        </button>
    </div>
</template>
