<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '../components/Spinner.vue';
// import data from '@/data/destinations.json';

const route = useRoute();
const router = useRouter(); // for redirect

const destination = ref(null);
const error = ref(null);
const loading = ref(true);
const deleting = ref(false);

// destination.value = data.find(d => d.slug === route.params.slug);

onMounted(async () => {
    loading.value = true;
    try {
        const response = await fetch(`/api/destinations?slug=${route.params.slug}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.length) {
            router.replace('/404');
            return
        }

        destination.value = data[0] || null; // returns an array
    } catch (err) {
        error.value = err.message;
        console.error('Fetch error:', err);
    } finally {
        loading.value = false;
    }
});

const deleteDestination = async () => {
    if (!destination.value?.id) return;

    const confirmed = confirm('Are you sure you want to delete this destination?');
    if (!confirmed) return;

    deleting.value = true;
    try {
        const response = await fetch(`/api/destinations/${destination.value.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete: ${response.status}`);
        }

        router.push('/destinations'); // redirect
    } catch (err) {
        console.error('Delete error:', err);
    } finally {
        deleting.value = false;
    }
};
</script>

<template>
    <main class="space-y-20 my-20">
        <section class="max-w-4xl mx-auto px-4">
            <!-- Loader -->
            <div class="flex justify-center py-20" v-if="loading">
                <Spinner />
            </div>

            <!-- Error message -->
            <p v-if="error" class="text-red-600">{{ error }}</p>

            <!-- Destination details -->
            <div v-if="!loading && destination">
                <div v-if="destination">
                    <h1 class="text-3xl font-bold mb-4">{{ destination.title }}</h1>
                    <p class="text-gray-600 mb-2"><strong>Location:</strong> {{ destination.destination }}</p>
                    <p class="text-lg font-light mb-4">{{ destination.description }}</p>
                    <p class="text-xl font-semibold text-sky-700 dark:text-sky-300">Price: ${{ destination.price }}</p>
                </div>
                <div v-else>
                    <p>Destination not found.</p>
                </div>
                <div v-if="destination" class="mt-6 flex gap-4">
                    <router-link :to="`/destinations/edit/${destination.slug}`"
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition duration-200">
                        Edit
                    </router-link>

                    <button @click="deleteDestination"
                        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition duration-200">
                        Delete
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>
