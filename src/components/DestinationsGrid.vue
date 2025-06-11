<script setup>
import { ref, computed, onMounted } from 'vue';
import DestinationCard from './DestinationCard.vue';
import data from '@/data/destinations.json';

const props = defineProps({
    limit: {
        type: Number,
        default: data.length
    }
});

const destinations = ref([]);

onMounted(() => {
    destinations.value = data;
});

const limitedDestinations = computed(() => {
    return destinations.value.slice(0, props.limit);
});
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DestinationCard v-for="destination in limitedDestinations" :key="destination.id" :destination="destination" />
    </div>
</template>
