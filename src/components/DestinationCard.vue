<script setup>
import { RouterLink } from 'vue-router';
import TagsList from './TagsList.vue';

const { destination, showTags = false } = defineProps({
    destination: Object,
    showTags: {
        type: Boolean,
        default: false
    }
});

const fallbackImage = "minimalist-destination-card-01.jpg";
const fallbackAlt = "Minimalist illustration card";

const imageSrc = `/media/${destination.imageUrl || fallbackImage}`;
// Import from src/assets/images
// const imageSrc = new URL(
//     `../assets/images/${destination.imageUrl || fallbackImage}`,
//     import.meta.url
// ).href;

const imageAlt = destination.imageAlt || fallbackAlt;
</script>

<template>
    <div class="flex flex-col rounded-2xl shadow-md bg-[var(--color-background-soft)] h-full overflow-hidden">

        <div class="relative">
            <img :src="imageSrc" :alt="imageAlt" class="object-cover w-full h-48" />

            <div class="absolute top-2 left-2 flex flex-wrap gap-1" v-if="showTags">
                <TagsList :tags="destination.tags" />
            </div>
        </div>

        <div class="flex flex-col p-6 gap-4 flex-grow">
            <h3 class="text-2xl font-semibold text-neutral-800 dark:text-white">
                {{ destination.title }}
            </h3>

            <p class="text-neutral-600 dark:text-neutral-300">
                {{ destination.excerpt }}
            </p>

            <p class="text-lg font-semibold text-sky-700 dark:text-sky-300">
                ${{ destination.price }}
            </p>

            <RouterLink :to="`/destinations/${destination.slug}`" class="mt-auto">
                <button
                    class="bg-teal-700 dark:bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-lg transition-colors duration-200">
                    Read More
                </button>
            </RouterLink>
        </div>
    </div>
</template>
