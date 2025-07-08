<script setup>
import heroDarkTheme from '@/assets/images/hero-dark-theme.webp'
import heroLightTheme from '@/assets/images/hero-light-theme.webp'

defineProps({
    title: {
        type: String,
        default: 'Destinations',
    },
    subtitle: {
        type: String,
        default: '',
    },
});

const themeClass = 'min-h-[450px]';
</script>

<template>
    <section class="relative flex items-center justify-center text-center" :class="themeClass">
        <div class="absolute inset-0 z-0">
            <picture>
                <source :srcset="heroDarkTheme" media="(prefers-color-scheme: dark)" />
                <img :src="heroLightTheme" alt="Hero background" class="w-full h-full object-cover" />
            </picture>
            <div class="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>
        <div class="relative z-10 px-4">
            <h1 class="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white">
                {{ title }}
            </h1>
            <p v-if="subtitle" class="mt-4 text-2xl md:text-3xl font-medium text-neutral-700 dark:text-neutral-300">
                {{ subtitle }}
            </p>
        </div>
    </section>
</template>
