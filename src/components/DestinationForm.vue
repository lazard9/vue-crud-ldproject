<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { saveDestination } from '@/api/destinations';

import TipTapEditor from '@/components/TipTapEditor.vue';

const props = defineProps({
    existingData: {
        type: Object,
        default: null,
    },
});

const router = useRouter();

const form = reactive({
    title: '',
    slug: '',
    destination: '',
    excerpt: '',
    description: '',
    price: '',
    imageUrl: '',
    imageAlt: '',
    tags: [],
});

const errors = reactive({
    title: '',
    destination: '',
    excerpt: '',
    description: '',
    price: '',
    tags: '',
    global: ''
});

onMounted(() => {
    if (props.existingData) {
        Object.assign(form, props.existingData);

        if (Array.isArray(props.existingData.tags)) {
            form.tags = props.existingData.tags.join(', ');
        }
    }
});

const imagePreview = ref('');
const imageFile = ref(null);

/**
 * Handles an image upload event by setting the imagePreview and imageFile
 * reactive state variables.
 *
 * @param {Event} event - The input event that triggered the function.
 */
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        imagePreview.value = URL.createObjectURL(file);
        imageFile.value = file;
    }
}

/**
 * Validates the destination form by checking if all required fields have been filled in correctly.
 * The function sets the errors reactive state variable with error messages if any of the
 * required fields are not valid.
 *
 * @returns {Boolean} true if the form is valid, false otherwise.
 */
function validateForm() {
    let valid = true;
    errors.title = form.title ? '' : 'Title is required';
    errors.destination = form.destination ? '' : 'Destination is required';
    errors.excerpt = form.excerpt ? '' : 'Excerpt is required';
    errors.description = form.description ? '' : 'Description is required';
    errors.price = form.price && Number(form.price) > 0 ? '' : 'Price must be a positive number';
    errors.tags = form.tags.length ? '' : 'At least one tag is required';

    valid = !Object.values(errors).some(e => e !== '');

    return valid;
}

/**
 * Handles the submission of the destination form by validating the form data, saving
 * the destination to the API, and redirecting the user to the destination page.
 *
 * If the form is invalid, the form is not submitted and the `errors` reactive state
 * variable is populated with error messages for each invalid field.
 *
 * If the form is valid, the destination is saved to the API and the user is
 * redirected to the destination page. If an error occurs while saving the
 * destination, the `errors` reactive state variable is populated with a global
 * error message.
 */
async function handleSubmit() {
    if (!validateForm()) return;

    try {
        const slug = await saveDestination({
            ...form,
            imageFile: imageFile.value,
            tags: form.tags,
        }, props.existingData);

        const redirectTo = props.existingData
            ? `/destinations/${slug}`
            : '/destinations';

        router.push(redirectTo);
    } catch (error) {
        errors.global = error.message || 'An unexpected error occurred';
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-2">
            <p class="text-sm font-medium text-[var(--color-heading)]">Upload an image</p>
            <p class="text-xs text-gray-500 mt-1 max-w-md">
                Due to browser security restrictions, this app does not support direct image uploads. Please add your
                image files manually to the <code>'public/media'</code> folder.
            </p>
            <div
                class="relative w-full aspect-video border border-dashed border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-background-soft)] flex items-center justify-center cursor-pointer group">
                <label class="absolute inset-0 z-10 cursor-pointer">
                    <input type="file" accept="image/*" @change="handleImageUpload" class="hidden" />

                    <!-- IF picture exists -->
                    <img v-if="imagePreview || form.imageUrl" :src="imagePreview || `/media/${form.imageUrl}`"
                        :alt="form.imageAlt || 'Destination image'"
                        class="w-full h-full object-cover transition-opacity duration-300" />

                    <!-- Overlay only IF there is an image -->
                    <div v-if="imagePreview || form.imageUrl"
                        class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition text-white text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-60 mb-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 7h4l2-3h6l2 3h4v13H3V7z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 11a3 3 0 100 6 3 3 0 000-6z" />
                        </svg>
                        <span class="opacity-80 text-xs">Click to change image</span>
                    </div>

                    <!-- Blank display - only IF there is no image -->
                    <div v-else
                        class="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-text-muted)] text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-50 mb-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 7h4l2-3h6l2 3h4v13H3V7z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 11a3 3 0 100 6 3 3 0 000-6z" />
                        </svg>
                        <span>Click on the box to upload</span>
                    </div>
                </label>
            </div>
        </div>

        <div>
            <label class="block text-sm font-medium text-[var(--color-heading)] mb-1">Title</label>
            <input v-model="form.title"
                class="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-background-soft)] text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--color-border-hover)] transition"
                placeholder="E.g. Paris" />
            <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
        </div>

        <div>
            <label class="block text-sm font-medium text-[var(--color-heading)] mb-1">Destination (country)</label>
            <input v-model="form.destination"
                class="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-background-soft)] text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--color-border-hover)] transition"
                placeholder="E.g. France" />
            <p v-if="errors.destination" class="text-red-500 text-sm mt-1">{{ errors.destination }}</p>
        </div>

        <div>
            <label class="block text-sm font-medium text-[var(--color-heading)] mb-1">Tags (comma separated)</label>
            <input v-model="form.tags"
                class="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-background-soft)] text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--color-border-hover)] transition"
                placeholder="e.g. romantic, city break, europe" />
            <p v-if="errors.tags" class="text-red-500 text-sm mt-1">{{ errors.tags }}</p>
        </div>


        <div>
            <label class="block text-sm font-medium text-[var(--color-heading)] mb-1">Excerpt</label>
            <input v-model="form.excerpt"
                class="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-background-soft)] text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--color-border-hover)] transition"
                placeholder="Short description" />
            <p v-if="errors.excerpt" class="text-red-500 text-sm mt-1">{{ errors.excerpt }}</p>
        </div>

        <div>
            <label class="block text-sm font-medium text-[var(--color-heading)] mb-1">Description</label>
            <!-- <textarea v-model="form.description" rows="5"
                class="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-background-soft)] text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--color-border-hover)] transition"
                placeholder="Full destination description"></textarea> -->
            <TipTapEditor v-model="form.description" />
            <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
        </div>

        <div>
            <label class="block text-sm font-medium text-[var(--color-heading)] mb-1">Price (€)</label>
            <input v-model="form.price" type="number" min="1"
                class="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-background-soft)] text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--color-border-hover)] transition"
                placeholder="E.g. 999" />
            <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price }}</p>
        </div>

        <button type="submit"
            class="bg-[#1cc6fd] hover:bg-[#19b2e3] text-white font-semibold py-2 px-4 rounded-md transition">
            {{ props.existingData ? 'Update' : 'Add' }} Destination
        </button>

        <p v-if="errors.global" class="text-red-600 mt-4 text-center font-semibold">
            {{ errors.global }}
        </p>
    </form>
</template>
