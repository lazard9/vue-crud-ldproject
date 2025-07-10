<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '../components/Spinner.vue';
// import data from '@/data/destinations.json';

const { loggedIn } = defineProps({ loggedIn: Boolean })

const route = useRoute();
const router = useRouter(); // for redirect

const destination = ref(null);
const error = ref(null);
const loading = ref(true);
const deleting = ref(false);

const fallbackImage = 'minimalist-destination-card-01.jpg';
const fallbackAlt = 'Minimalist illustration card';

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

const imageSrc = computed(() => {
    if (!destination.value) return '';
    const filename = destination.value?.imageUrl || fallbackImage;
    return `../media/${filename}`;
    // return new URL(`../assets/images/${filename}`, import.meta.url).href;
});

const imageAlt = computed(() => {
    return destination.value?.imageAlt || fallbackAlt;
});

const filteredTags = computed(() => {
    return destination.value?.tags.filter(
        tag => tag !== 'top' && tag !== 'pinned' && tag !== 'grid'
    );
});
</script>

<template>
    <main class="space-y-20 my-20">
        <section class="max-w-3xl mx-auto px-4">
            <!-- Loader -->
            <div class="flex justify-center py-20" v-if="loading">
                <Spinner />
            </div>

            <!-- Error message -->
            <p v-if="error" class="text-red-600">{{ error }}</p>

            <!-- Destination details -->
            <div v-if="!loading && destination">
                <div v-if="destination">
                    <img :src="imageSrc" :alt="imageAlt" class="w-full max-h-96 object-cover rounded-xl mb-8" />
                    <h1 class="text-3xl md:text-5xl font-bold mb-4">{{ destination.title }}</h1>
                    <p class="text-gray-600 mb-4"><strong>Location:</strong> {{ destination.destination }}</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span v-for="tag in filteredTags" :key="tag"
                            class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm dark:bg-gray-700 dark:text-gray-100">
                            #{{ tag }}
                        </span>
                    </div>
                    <div class="tiptap-content mb-8" v-html="destination.description"></div>
                    <p class="text-xl font-semibold text-sky-700 dark:text-sky-300">Price: ${{ destination.price }}</p>
                </div>
                <div v-else>
                    <p>Destination not found.</p>
                </div>
                <div v-if="loggedIn" class="mt-8 flex gap-4">
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
