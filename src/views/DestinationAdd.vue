<script setup>
import HeroSection from '../components/HeroSection.vue';
import DestinationForm from '../components/DestinationForm.vue';
</script>

<template>
    <main class="space-y-20 mb-20">
        <section class="max-w-full mx-auto">
            <HeroSection title="Add a Destination" />
        </section>

        <section class="max-w-2xl mx-auto px-4">
            <DestinationForm />
        </section>
    </main>
</template>
