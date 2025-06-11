<script setup>
defineProps({
    destination: Object
});
</script>

<template>
    <div class="p-6 rounded-2xl shadow-md bg-[var(--color-background-soft)] flex flex-col items-start gap-4">
        <h3 class="text-2xl font-semibold text-neutral-800 dark:text-white">
            {{ destination.title }}
        </h3>

        <p class="text-neutral-600 dark:text-neutral-300">
            {{ destination.excerpt }}
        </p>

        <p class="text-lg font-semibold text-sky-700 dark:text-sky-300">
            ${{ destination.price }}
        </p>

        <RouterLink :to="`/destinations/${destination.slug}`">
            <button
                class="bg-teal-700 dark:bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-lg transition-colors duration-200">
                Read More
            </button>
        </RouterLink>
    </div>
</template>
