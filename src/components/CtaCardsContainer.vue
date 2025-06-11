<script setup>
import CtaCard from './CtaCard.vue'
</script>

<template>
    <div class="grid gap-6 md:grid-cols-2">
        <CtaCard title="Explore Destinations" description="Browse our collection of beautiful locations."
            buttonText="See all" buttonColor="blue" link="/destinations" />
        <CtaCard title="Add a Destination" description="Share your favorite place with others." buttonText="Add now"
            buttonColor="purple" link="/destinations/add" />
    </div>
</template>
