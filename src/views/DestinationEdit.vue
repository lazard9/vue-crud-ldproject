<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import DestinationForm from "../components/DestinationForm.vue";
import { getDestinationBySlug } from "@/api/destinations";

const route = useRoute();
const router = useRouter();
const destination = ref(null);

onMounted(async () => {
    try {
        destination.value = await getDestinationBySlug(route.params.slug);
        if (!destination.value) {
            router.replace("/404");
        }
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <main class="space-y-20 my-20" v-if="destination">
        <section class="max-w-2xl mx-auto px-4">
            <h2 v-if="destination.title"
                class="text-4xl md:text-5xl text-center font-bold text-neutral-900 dark:text-white mb-12">
                Edit Destination: {{ destination.title }}
            </h2>

            <DestinationForm :existingData="destination" />
        </section>
    </main>
</template>
