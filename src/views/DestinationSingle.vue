<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// import data from '@/data/destinations.json';

const route = useRoute();
const destination = ref(null);
const error = ref(null);

// destination.value = data.find(d => d.slug === route.params.slug);

onMounted(async () => {
    try {
        const response = await fetch(`http://localhost:8080/destinations?slug=${route.params.slug}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        destination.value = data[0] || null; // returns an array
    } catch (err) {
        error.value = err.message;
        console.error('Fetch error:', err);
    }
});
</script>

<template>
    <main class="space-y-20 my-20">
        <section class="max-w-4xl mx-auto px-4">
            <div v-if="destination">
                <h1 class="text-3xl font-bold mb-4">{{ destination.title }}</h1>
                <p class="text-gray-600 mb-2"><strong>Location:</strong> {{ destination.destination }}</p>
                <p class="text-lg font-light mb-4">{{ destination.description }}</p>
                <p class="text-xl font-semibold text-sky-700 dark:text-sky-300">Price: ${{ destination.price }}</p>
            </div>
            <div v-else>
                <p>Destination not found.</p>
            </div>
        </section>
    </main>
</template>
