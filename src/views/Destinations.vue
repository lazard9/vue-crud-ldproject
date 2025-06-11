<script setup>
import HeroSection from '../components/HeroSection.vue';
import DestinationsGrid from '../components/DestinationsGrid.vue';
</script>

<template>
    <main class="space-y-20 mb-20">
        <section class="max-w-full mx-auto">
            <HeroSection title="Top Destinations" subtitle="Hand-picked locations just for you" />
        </section>

        <section class="max-w-screen-2xl mx-auto px-4">
            <h2 class="text-4xl font-bold text-neutral-900 dark:text-white mb-8">Top Destinations</h2>
            <DestinationsGrid />
        </section>
    </main>
</template>
