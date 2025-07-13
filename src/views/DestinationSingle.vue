<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import TagsList from "@/components/TagsList.vue";
import Spinner from "@/components/Spinner.vue";
import { getDestinationBySlug, deleteDestinationById } from '@/api/destinations';

const { loggedIn } = defineProps({ loggedIn: Boolean });

const route = useRoute();
const router = useRouter(); // for redirect

const destination = ref(null);
const error = ref(null);
const loading = ref(true);
const deleting = ref(false);

const fallbackImage = "minimalist-destination-card-01.jpg";
const fallbackAlt = "Minimalist illustration card";

onMounted(async () => {
    try {
        destination.value = await getDestinationBySlug(route.params.slug);
        if (!destination.value) {
            router.replace('/404');
        }
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

const deleteDestination = async () => {
    if (!destination.value?.id) return;

    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;

    deleting.value = true;
    try {
        await deleteDestinationById(destination.value.id);
        router.push('/destinations');
    } catch (err) {
        console.error("Delete error:", err);
    } finally {
        deleting.value = false;
    }
};

const imageSrc = computed(() => {
    if (!destination.value) return "";
    const filename = destination.value?.imageUrl || fallbackImage;
    return `/media/${filename}`;
    // return new URL(`../assets/images/${filename}`, import.meta.url).href;
});

const imageAlt = computed(() => {
    return destination.value?.imageAlt || fallbackAlt;
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
                    <h1 class="text-3xl md:text-5xl font-bold mb-4">
                        {{ destination.title }}
                    </h1>
                    <p class="text-gray-600 mb-4">
                        <strong>Location:</strong> {{ destination.destination }}
                    </p>
                    <div class="flex flex-wrap gap-2 mb-6" v-if="destination.tags">
                        <TagsList :tags="destination.tags" />
                    </div>
                    <div class="tiptap-content mb-8" v-html="destination.description"></div>
                    <p class="text-xl font-semibold text-sky-700 dark:text-sky-300">
                        Price: ${{ destination.price }}
                    </p>
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
