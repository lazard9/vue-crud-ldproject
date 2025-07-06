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
    },
    tag: {
        type: String,
        required: false
    }
});

const destinations = ref([]);
const error = ref(null);
const loading = ref(true);

onMounted(async () => {
    // destinations.value = data;

    try {
        const response = await fetch('/api/destinations');
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
    let filtered = destinations.value;

    if (props.tag) {
        filtered = filtered.filter(dest =>
            dest.tags?.includes(props.tag)
        );
    }

    return typeof props.limit === 'number'
        ? filtered.slice(0, props.limit)
        : filtered;
});
</script>

<template>
    <div>
        <div v-if="loading" class="flex justify-center py-20">
            <Spinner size="10" />
        </div>
        <div v-else-if="error" class="text-red-600 text-center py-20">{{ error }}</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DestinationCard v-for="destination in limitedDestinations" :key="destination.id"
                :destination="destination" />
        </div>
    </div>
</template>
