<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
    tags: {
        type: Array,
        default: () => []
    },
    excludeTags: {
        type: Array,
        default: () => ['top', 'pinned', 'grid']
    },
    tagClass: {
        type: String,
        default: 'bg-black bg-opacity-40 text-white text-xs px-2 py-1 rounded-full hover:bg-opacity-60 transition-colors'
    }
})

const filteredTags = computed(() =>
    props.tags.filter(tag => !props.excludeTags.includes(tag))
)
</script>

<template>
    <div class="flex flex-wrap gap-1">
        <RouterLink v-for="tag in filteredTags" :key="tag" :to="`/destinations/tags/${tag}`" :class="tagClass">
            {{ tag }}
        </RouterLink>
    </div>
</template>
