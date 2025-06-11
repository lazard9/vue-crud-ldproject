<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import data from '@/data/destinations.json';

const route = useRoute();
const destination = ref(null);

destination.value = data.find(d => d.slug === route.params.slug);
</script>

<template>
    <main class="space-y-20 my-20">
       <section class="max-w-4xl mx-auto px-4">
            <div v-if="destination">
                <h1 class="text-3xl font-bold mb-4">{{ destination.title }}</h1>
                <p class="text-gray-600 mb-2"><strong>Location:</strong> {{ destination.destination }}</p>
                <p class="text-lg mb-4">{{ destination.description }}</p>
                <p class="text-xl font-semibold text-sky-700 dark:text-sky-300">Price: ${{ destination.price }}</p>
            </div>
            <div v-else>
                <p>Destination not found.</p>
            </div>
        </section>
    </main>
</template>
