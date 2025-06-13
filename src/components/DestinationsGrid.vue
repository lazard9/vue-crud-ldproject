<script setup>
import { ref, computed, onMounted } from 'vue';
import DestinationCard from './DestinationCard.vue';
import Spinner from './Spinner.vue';
// import data from '@/data/destinations.json';

const props = defineProps({
    limit: {
        type: Number,
        required: false,
        validator: val => val >= 0
    }
});

const destinations = ref([]);
const error = ref(null);
const loading = ref(true);

onMounted(async () => {
    // destinations.value = data;

    try {
        const response = await fetch('http://localhost:8080/destinations');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        destinations.value = data;
    } catch (err) {
        error.value = err.message;
        console.error('Fetch error:', err);
    } finally {
        loading.value = false;
    }
});

const limitedDestinations = computed(() => {
    return typeof props.limit === 'number'
        ? destinations.value.slice(0, props.limit)
        : destinations.value;
});
</script>

<template>
    <div>
        <div v-if="loading" class="flex justify-center py-20">
            <Spinner size="10" />
        </div>
        <div v-else-if="error" class="text-red-600 text-center py-20">{{ error }}</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DestinationCard v-for="destination in limitedDestinations" :key="destination.id"
                :destination="destination" />
        </div>
    </div>
</template>
