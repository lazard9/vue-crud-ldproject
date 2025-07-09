<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DestinationForm from '../components/DestinationForm.vue';

const route = useRoute();
const router = useRouter();
const destination = ref(null);

onMounted(async () => {
    const res = await fetch(`/api/destinations?slug=${route.params.slug}`);
    const data = await res.json();

    if (!data.length) {
        router.replace('/404');
        return;
    }

    destination.value = data[0];
});
</script>


<template>
    <main class="space-y-20 my-20" v-if="destination">
        <section class="max-w-2xl mx-auto px-4">
            <h2 v-if="destination.title"
                class="text-4xl md:text-5xl text-center font-bold text-neutral-900 dark:text-white mb-12">Edit Destination: {{
                    destination.title }}</h2>

            <DestinationForm :existingData="destination" />
        </section>
    </main>
</template>
