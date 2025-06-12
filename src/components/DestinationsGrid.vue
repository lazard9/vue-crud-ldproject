<script setup>
import { ref, computed, onMounted } from 'vue';
import DestinationCard from './DestinationCard.vue';
// import data from '@/data/destinations.json';

const props = defineProps({
    limit: {
        type: Number,
        required: false,
        validator: val => val >= 0
    }
});

const destinations = ref([]);

onMounted(async () => {
    // destinations.value = data;

    try {
        const response = await fetch('http://localhost:8080/destinations')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        destinations.value = data
    } catch (err) {
        error.value = err.message
        console.error('Fetch error:', err)
    }
});

const limitedDestinations = computed(() => {
    return typeof props.limit === 'number'
        ? destinations.value.slice(0, props.limit)
        : destinations.value;
});
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DestinationCard v-for="destination in limitedDestinations" :key="destination.id" :destination="destination" />
    </div>
</template>
