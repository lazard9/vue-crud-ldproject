<script setup>
import { ref, computed, onMounted, watch } from "vue";
import DestinationCard from "./DestinationCard.vue";
import Pagination from "./Pagination.vue";
import Spinner from "@/components/Spinner.vue";
import { getAllDestinations } from "@/api/destinations";

const props = defineProps({
    limit: Number, // hard limit (without pagination)
    postsPerPage: Number, // pagination if there is no hard limit
    filterTag: String,
    showTags: {
        type: Boolean,
        default: false,
    },
});

const destinations = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);

// Get destinations
onMounted(async () => {
    try {
        destinations.value = await getAllDestinations();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

watch(() => props.filterTag, () => {
    currentPage.value = 1;
});

/* 
 * Filter destinations by the provided tag (filterTag):
 * If filterTag is set, return only destinations whose tags include it,
 * otherwise return the full list of destinations.
 */
const filteredDestinations = computed(() => {
    return props.filterTag
        ? destinations.value.filter((dest) =>
            dest.tags?.includes(props.filterTag)
        )
        : destinations.value;
});

/*
 * Determine if pagination should be enabled:
 * Pagination is used only if `limit` is not set and `postsPerPage` is defined
 */
 const usePagination = computed(() => {
    return props.limit == null && props.postsPerPage != null;
});

/*
 * Calculate total number of pages for pagination:
 *  If pagination is disabled, total pages is 1
 */
 const totalPages = computed(() => {
    if (!usePagination.value) return 1;
    return Math.ceil(filteredDestinations.value.length / props.postsPerPage);
});

/*
 * Compute the list of destinations to display based on current props:
 * - If `limit` is set, show only that many destinations (no pagination)
 * - Else if pagination is enabled, slice the destinations for the current page
 * - Otherwise, show all filtered destinations
 */
const displayedDestinations = computed(() => {
    if (props.limit != null) {
        return filteredDestinations.value.slice(0, props.limit);
    }

    if (usePagination.value) {
        const start = (currentPage.value - 1) * props.postsPerPage;
        return filteredDestinations.value.slice(
            start,
            start + props.postsPerPage
        );
    }

    return filteredDestinations.value;
});
</script>

<template>
    <div>
        <!-- Loading / Error / Empty -->
        <div v-if="loading" class="flex justify-center py-20">
            <Spinner size="10" />
        </div>

        <div v-else-if="error" class="text-red-600 text-center py-20">
            {{ error }}
        </div>

        <div v-else-if="displayedDestinations.length === 0" class="text-neutral-500 text-center py-20">
            No destinations found.
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <DestinationCard v-for="destination in displayedDestinations" :key="destination.id"
                :destination="destination" :show-tags="showTags" />
        </div>

        <!-- Pagination -->
        <Pagination v-if="usePagination && totalPages > 1" :current-page="currentPage" :total-pages="totalPages"
            @page-change="currentPage = $event" />
    </div>
</template>
