<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

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
});

const errors = reactive({
    title: '',
    destination: '',
    excerpt: '',
    description: '',
    price: '',
    global: ''
});

onMounted(() => {
    if (props.existingData) {
        Object.assign(form, props.existingData);
    }
});

function validateForm() {
    let valid = true;
    errors.title = form.title ? '' : 'Title is required';
    errors.destination = form.destination ? '' : 'Destination is required';
    errors.excerpt = form.excerpt ? '' : 'Excerpt is required';
    errors.description = form.description ? '' : 'Description is required';
    errors.price = form.price && Number(form.price) > 0 ? '' : 'Price must be a positive number';

    valid = !Object.values(errors).some(e => e !== '');

    return valid;
}

async function handleSubmit() {
    if (!validateForm()) return;

    const method = props.existingData ? 'PATCH' : 'POST';
    const url = props.existingData
        ? `/api/destinations/${props.existingData.id}`
        : '/api/destinations';

    const payload = {
        ...form,
    };

    if (props.existingData) {
        payload.slug = props.existingData.slug;
    } else {
        payload.slug = await generateUniqueSlug(form.title);
        payload.id = uuidv4();
    }

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to save destination');
        }

        const redirectTo = props.existingData
            ? `/destinations/${payload.slug}`
            : '/destinations';

        router.push(redirectTo);
    } catch (error) {
        errors.global = error.message || 'An unexpected error occurred';
    }
}

async function generateUniqueSlug(title) {
    const baseSlug = title.toLowerCase().trim().replace(/\s+/g, '-');
    const res = await fetch(`/api/destinations?slug_like=${baseSlug}`);
    const data = await res.json();

    if (!data.length) return baseSlug;

    let counter = 1;
    let newSlug = `${baseSlug}-${counter}`;
    const existingSlugs = data.map(d => d.slug);

    while (existingSlugs.includes(newSlug)) {
        counter++;
        newSlug = `${baseSlug}-${counter}`;
    }

    return newSlug;
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
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
