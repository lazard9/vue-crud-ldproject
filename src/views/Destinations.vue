<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import HeroSection from "../components/HeroSection.vue";
import DestinationsGrid from "../components/DestinationsGrid.vue";

const route = useRoute();

const tag = computed(() => route.params.tag || null);

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
</script>

<template>
    <main class="space-y-20 mb-20">
        <section class="max-w-full mx-auto">
            <HeroSection :title="tag ? `Destinations tagged '${capitalizeFirstLetter(tag)}'` : 'Top Destinations'
                " :subtitle="tag
                        ? ''
                        : 'Hand-picked locations just for you'
                    " />
        </section>

        <section class="max-w-screen-2xl mx-auto px-4">
            <h2 class="text-4xl font-bold text-neutral-900 dark:text-white mb-8">
                {{ tag ? `Selected tag: ${capitalizeFirstLetter(tag)}` : "Browse all Destinations" }}
            </h2>

            <DestinationsGrid :posts-per-page="8" :show-tags="true" :filter-tag="tag" />
        </section>
    </main>
</template>
