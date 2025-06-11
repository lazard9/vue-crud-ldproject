<script setup>
defineProps({
    title: String,
    description: String,
    buttonText: String,
    buttonColor: {
        type: String,
        default: 'blue', // 'blue' or 'purple'
        validator: (val) => ['blue', 'purple'].includes(val),
    },
    link: {
        type: String,
        required: true,
    },
});

const colorClasses = {
    blue: 'bg-[#19b2e4] hover:bg-[#1cc6fd]',
    purple: 'bg-[#7d3fe0] hover:bg-[#9354fc]',
};
</script>

<template>
    <div class="p-6 rounded-2xl shadow-md bg-[var(--color-background-soft)] flex flex-col items-start gap-4">
        <h3 class="text-2xl font-semibold text-neutral-800 dark:text-white">{{ title }}</h3>
        <p class="text-neutral-600 dark:text-neutral-300">{{ description }}</p>
        <RouterLink :to="link">
            <button :class="['text-white px-5 py-2 rounded-lg transition-colors duration-200', colorClasses[buttonColor]]">
                {{ buttonText }}
            </button>
        </RouterLink>
    </div>
</template>
