<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import HeroSection from '../components/HeroSection.vue';
import DestinationForm from '../components/DestinationForm.vue';

const route = useRoute();
const destination = ref(null);

onMounted(async () => {
    const res = await fetch(`/api/destinations?slug=${route.params.slug}`);
    const data = await res.json();
    destination.value = data[0]; // Assuming slug is unique
});
</script>

<template>
    <main class="space-y-20 mb-20" v-if="destination">
        <section class="max-w-full mx-auto">
            <HeroSection title="Edit Destination" />
        </section>

        <section class="max-w-2xl mx-auto px-4">
            <h2 v-if="destination.title"
                class="text-3xl md:text-4xl text-center font-bold text-neutral-900 dark:text-white mb-12">{{
                destination.title }}</h2>

            <DestinationForm :existingData="destination" />
        </section>
    </main>
</template>
