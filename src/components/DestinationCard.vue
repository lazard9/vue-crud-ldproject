<script setup>
const { destination } = defineProps({
    destination: Object
});

const fallbackImage = "minimalist-destination-card-01.jpg";
const fallbackAlt = "Minimalist illustration card";

const imageSrc = new URL(
    `../assets/images/${destination.imageUrl || fallbackImage}`,
    import.meta.url
).href;

const imageAlt = destination.imageAlt || fallbackAlt;
</script>

<template>
    <div class="flex flex-col rounded-2xl shadow-md bg-[var(--color-background-soft)] h-full overflow-hidden">

        <img :src="imageSrc" :alt="imageAlt" class="w-full h-52 sm:h-64 object-cover" loading="lazy" />

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
