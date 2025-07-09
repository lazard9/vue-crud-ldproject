<script setup>
const { destination, showTags = false } = defineProps({
    destination: Object,
    showTags: {
        type: Boolean,
        default: false
    }
});

const fallbackImage = "minimalist-destination-card-01.jpg";
const fallbackAlt = "Minimalist illustration card";

const imageSrc = new URL(
    `../assets/images/${destination.imageUrl || fallbackImage}`,
    import.meta.url
).href;

const imageAlt = destination.imageAlt || fallbackAlt;

const filteredTags = destination.tags.filter(
    tag => tag !== 'top' && tag !== 'pinned' && tag !== 'grid'
);
</script>

<template>
    <div class="flex flex-col rounded-2xl shadow-md bg-[var(--color-background-soft)] h-full overflow-hidden">

        <div class="relative">
            <img :src="imageSrc" :alt="imageAlt" class="rrounded-2xl object-cover w-full h-48" />

            <div class="absolute top-2 left-2 flex flex-wrap gap-1" v-if="showTags && filteredTags.length">
                <span v-for="tag in filteredTags" :key="tag"
                    class="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                    {{ tag }}
                </span>
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
