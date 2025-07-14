<script setup>
import { ref, computed, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Spinner from '@/components/Spinner.vue';
import { getAllDestinations } from '@/api/destinations';

const props = defineProps({
    tag: {
        type: String,
        required: true
    }
});

const destinations = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        destinations.value = await getAllDestinations();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

const filteredDestinations = computed(() =>
    destinations.value.filter(dest =>
        dest.tags.includes(props.tag)
    )
);

const fallbackImage = "minimalist-destination-card-01.jpg";
const fallbackAlt = "Minimalist illustration card";

/**
 * Return the URL for an image, or a fallback URL if the given URL is falsy.
 * @param {string} [imageUrl] URL of the image to use. If falsy, falls back to the
 *   `fallbackImage` exported by this module.
 * @returns {string} The URL of the image to use.
 */
function getImageSrc(imageUrl) {
    return `/media/${imageUrl || fallbackImage}`;
}

/**
 * Handles an image load error by setting the image's `src` attribute to
 * the fallback image URL and setting its `alt` attribute to the
 * fallback alt text.
 *
 * @param {Event} event - The error event that triggered this function.
 */
function handleImageError(event) {
    event.target.src = `/media/${fallbackImage}`;
    event.target.alt = fallbackAlt;
}
</script>

<template>
    <div v-if="loading" class="flex justify-center py-20">
        <Spinner size="10" />
    </div>

    <p v-else-if="error" class="text-red-500">Error: {{ error }}</p>

    <Swiper v-else :slides-per-view="1.2" :space-between="20" :loop="true"
        :pagination="{ clickable: true, el: '.custom-swiper-pagination' }"
        :autoplay="{ delay: 5000, disableOnInteraction: false }" :modules="[Pagination, Navigation, Autoplay]"
        :breakpoints="{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 }
        }">
        <SwiperSlide v-for="destination in filteredDestinations" :key="destination.id" class="pb-10">
            <div class="flex flex-col rounded-2xl shadow-md bg-[var(--color-background-soft)] h-full overflow-hidden">
                <img :src="getImageSrc(destination.imageUrl)" :alt="destination.imageAlt || fallbackAlt"
                    @error="handleImageError" class="w-full h-52 sm:h-64 object-cover" loading="lazy" />

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
        </SwiperSlide>
    </Swiper>
    <div class="custom-swiper-pagination flex justify-center gap-2" />
</template>

<style scoped>
.swiper-slide {
    height: auto;
}

:deep(.swiper-pagination-bullet) {
    width: 1rem;
    height: 1rem;
    background-color: #19b2e4;
    opacity: 0.5;
    transition: background-color 0.3s;
}

:deep(.swiper-pagination-bullet:hover),
:deep(.swiper-pagination-bullet-active) {
    background-color: #1cc6fd;
    opacity: 1;
}
</style>
