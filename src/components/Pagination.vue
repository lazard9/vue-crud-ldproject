<!-- components/Pagination.vue -->
<script setup>
import { computed } from "vue";

const props = defineProps({
    currentPage: Number,
    totalPages: Number,
});

const emit = defineEmits(["page-change"]);

const emitPageChange = (page) => {
    if (page >= 1 && page <= props.totalPages) {
        emit("page-change", page);
    }
};

const visiblePages = computed(() => {
    const total = props.totalPages;
    const current = props.currentPage;
    const max = 5;

    if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);

    if (current <= 3) return [1, 2, 3, 4, "...", total];
    if (current >= total - 2)
        return [1, "...", total - 3, total - 2, total - 1, total];

    return [1, "...", current - 1, current, current + 1, "...", total];
});
</script>

<template>
    <div v-if="totalPages > 1" class="flex justify-center mt-8 gap-2 items-center flex-wrap">
        <button @click="emitPageChange(currentPage - 1)" :disabled="currentPage === 1" :class="[
            'px-3 py-1 border rounded transition',
            currentPage === 1 ? 'opacity-60' : '',
        ]">
            Prev
        </button>

        <!-- Page brojevi -->
        <template v-for="page in visiblePages" :key="page">
            <span v-if="page === '...'" class="px-2">...</span>
            <button v-else @click="emitPageChange(page)" :class="[
                'px-3 py-1 border rounded transition',
                page === currentPage
                    ? 'bg-gray-800 bg-opacity-70 text-white'
                    : '',
            ]">
                {{ page }}
            </button>
        </template>

        <button @click="emitPageChange(currentPage + 1)" :disabled="currentPage === totalPages" :class="[
            'px-3 py-1 border rounded transition',
            currentPage === totalPages
                ? 'opacity-60'
                : '',
        ]">
            Next
        </button>
    </div>
</template>
