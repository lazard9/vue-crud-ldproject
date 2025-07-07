<script setup>
import HeroSection from '../components/HeroSection.vue';
import CtaCardsContainer from '../components/CtaCardsContainer.vue';
import DestinationsGrid from '../components/DestinationsGrid.vue';
import DestinationsSlider from '../components/DestinationsSlider.vue';
</script>

<template>
    <main class="space-y-20 mb-20">
        <section class="max-w-full mx-auto">
            <HeroSection title="Plan your trip" subtitle="Choose your perfect destination" />
        </section>

        <section class="max-w-screen-xl mx-auto px-4 mb-20">
            <h2 class="text-4xl font-bold text-neutral-900 dark:text-white mb-8">Special Offers</h2>
            <DestinationsSlider tag="pinned" />
        </section>

        <section class="max-w-4xl mx-auto px-4 mb-20">
            <CtaCardsContainer />
        </section>

        <section class="max-w-screen-xl mx-auto px-4">
            <h2 class="text-4xl font-bold text-neutral-900 dark:text-white mb-8">Top Destinations</h2>

            <DestinationsGrid :limit="4" tag="top" />
        </section>
    </main>
</template>
