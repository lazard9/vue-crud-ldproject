<script setup>
import { ref, computed, onMounted } from 'vue';
import DestinationCard from './DestinationCard.vue';
import Spinner from '@/components/Spinner.vue';
import { getAllDestinations } from '@/api/destinations';

const props = defineProps({
    limit: {
        type: Number,
        required: false,
        validator: val => val >= 0
    },
    filterTag: {
        type: String,
        required: false
    },
    showTags: {
        type: Boolean,
        default: false
    }
});

const destinations = ref([]);
const error = ref(null);
const loading = ref(true);

onMounted(async () => {
    try {
        destinations.value = await getAllDestinations();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

const limitedDestinations = computed(() => {
    let filtered = destinations.value;

    if (props.filterTag) {
        filtered = filtered.filter(dest =>
            dest.tags?.includes(props.filterTag)
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

        <div v-else-if="error" class="text-red-600 text-center py-20">
            {{ error }}
        </div>

        <div v-else-if="limitedDestinations.length === 0" class="text-neutral-500 text-center py-20">
            No destinations found for this tag.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <DestinationCard v-for="destination in limitedDestinations" :key="destination.id" :destination="destination"
                :show-tags="showTags" />
        </div>
    </div>
</template>
