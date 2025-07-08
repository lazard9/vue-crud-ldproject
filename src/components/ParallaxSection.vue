<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="relative text-white text-center py-28 px-4 overflow-hidden">
        <!-- Parallax background -->
        <picture class="absolute inset-0 z-0 w-full h-full">
            <source srcset="/src/assets/images/parallax-dark.jpg" media="(prefers-color-scheme: dark)" />
            <img src="/src/assets/images/parallax-light.jpg" alt="Background image"
                class="w-full h-full object-cover" />
        </picture>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-10 z-10"></div>

        <!-- Content -->
        <div class="relative z-20 max-w-3xl mx-auto">
            <h2 class="text-4xl sm:text-5xl text-neutral-900 dark:text-white font-bold mb-4 drop-shadow-lg">
                Find Your Next Adventure
            </h2>

            <p class="text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 mb-6 drop-shadow">
                Explore beyond the ordinary with our unique destinations.
            </p>

            <RouterLink to="/destinations">
                <button class="bg-white text-[#7d3fe0] font-bold px-6 py-3 rounded-lg hover:bg-sky-100 transition">
                    Browse Destinations
                </button>
            </RouterLink>
        </div>
    </section>
</template>
